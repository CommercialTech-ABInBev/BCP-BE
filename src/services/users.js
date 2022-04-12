import { literal } from 'sequelize';
import paginate from '../utils/paginate';

import CommonService from './common';
import env from '../config/env';
import RabbitMQService from './messageQueue';
import DbService from '../repositories';
import AuthUtils from '../utils/auth';
import { HttpError } from '@src/middlewares/api-error-validator';
import db from '../models';
const { Tokens, Users } = db;

const { addEntity, findByKeys, updateByKey, deleteByKey } = DbService;

const {
    RESET_PASSWORD_QUEUE,
    RESET_EXCHANGE,
    RESET_ROUTING_KEY,
    SENDGRID_DOMAIN_EMAIL,
    SIGNUP_QUEUE,
    SIGNUP_ROUTING_KEY,
    SIGNUP_EXCHANGE,
} = env;

export default class AuthService {
    async createInvite(userData) {
        const { email, fullName } = userData;

        const token = CommonService.generateToken(email);
        await addEntity(Tokens, {
            type: 'signup-verify-token',
            token,
            email,
        });

        const body = {
            ...userData,
            emailVerified: false,
            inviteStatus: 'non-verified',
        };

        const user = await findByKeys(Users, { email });
        if (user) {
            throw new HttpError(401, `User Already Exist!`);
        }

        const newUser = await addEntity(Users, body);

        const message = {
            from: SENDGRID_DOMAIN_EMAIL,
            to: email,
            subject: 'Please confirm your account',
            html: `<h1>Email Confirmation</h1>
                  <h5>Hello, ${fullName}</h5>
                  <p>An invite have been sent to you</p>

                  <a href=https://localhost:3000/create-password?email=${email}&token=${token}> Click here</a>
                  </div>`,
        };
        RabbitMQService.consumer(SIGNUP_QUEUE, CommonService.sendEmail);
        RabbitMQService.publisher(
            message,
            SIGNUP_QUEUE,
            SIGNUP_EXCHANGE,
            SIGNUP_ROUTING_KEY
        );

        return newUser;
    }

    async acceptInviteService({ password }, email, token) {
        const user = await findByKeys(Users, { email });
        if (!user) {
            throw new HttpError(401, `No invite was sent across!`);
        }

        await updateByKey(
            Users, {
                password: await AuthUtils.hashPassword(password),
                emailVerified: true,
            }, { email }
        );

        await deleteByKey(Tokens, { token });
        const updatedUser = await findByKeys(Users, { email });

        return updatedUser;
    }
    async login({ email, password }) {
        const user = await findByKeys(Users, { email });

        if (!user || !user.emailVerified) {
            throw new HttpError(
                401,
                `User not found,Try verifying your email address!!!`
            );
        }

        if (!(await AuthUtils.comparePasswords(password, user.password))) {
            throw new HttpError(401, 'Password does not match!');
        }
        const tokenPayload = {
            email: user.email,
            id: user.id,
            role: user.role,
            brand: user.brand,
            location: user.location,
        };

        const token = CommonService.generateAuthToken(tokenPayload);

        return { user, token };
    }

    async resetPassword({ oldPassword, newPassword }, id) {
        const user = await findByKeys(Users, { id });

        if (!user) {
            throw new HttpError(404, 'User Not Found!');
        }

        if (!(await AuthUtils.comparePasswords(oldPassword, user.password))) {
            throw new HttpError(401, 'Password does not match!');
        }

        await updateByKey(
            Users, {
                password: await AuthUtils.hashPassword(newPassword),
            }, { id }
        );
        const updatedUser = await findByKeys(Users, { id });

        return updatedUser;
    }

    async;

    async softDeleteUser({ id }) {
        const user = await findByKeys(Users, { id });

        if (!user) {
            throw new HttpError(404, 'User Not Found!');
        }
        const deleteProfile = await deleteByKey(Users, { id });
        return deleteProfile;
    }

    async editCustomer(data, id) {
        await updateByKey(Users, {...data }, { id });
        const datas = await findByKeys(Users, { id });

        return datas;
    }

    async getAllUsers(query) {
        const { limit, offset } = paginate(query);
        const option = {
            limit,
            offset,
            order: literal('createdAt DESC'),
        };

        const { count, rows } = await Users.findAndCountAll(option);

        return { total: count, data: rows };
    }
}