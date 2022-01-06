import CommonService from './common';
import env from '../config/env';
import RabbitMQService from './messageQueue';
import DbService from '../repositories';
import AuthUtils from '../utils/auth';
import { HttpError } from '@src/middlewares/api-error-validator';
import db from '../models';
const { Tokens, Users } = db;

const { addEntity, findByKeys, updateByKey } = DbService;

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
    async signup(userData) {
        const { email, firstName, password } = userData;

        const token = CommonService.generateToken(email);
        await addEntity(Tokens, {
            type: 'signup-verify-token',
            token,
            email,
        });

        const body = {
            ...userData,
            password: await AuthUtils.hashPassword(password),
            role: 'user',
            emailVerified: true,
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
                  <h5>Hello, ${firstName}</h5>
                  <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>

                  <a href=https://localhost:4800/v1/auth/confirm-email?email=${email}&token=${token}> Click here</a>
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

    async login({ email, password }) {
        const user = await findByKeys(Users, { email });
        if (!user || !user.emailVerified) {
            throw new HttpError(401, `User not found,Try verifying your email address!!!`);
        }

        if (!(await AuthUtils.comparePasswords(password, user.password))) {
            throw new HttpError(401, 'Password does not match!');
        }
        const token = CommonService.generateToken(user.id);

        return { user, token };
    }

    async resetPassword({ oldPassword, newPassword }, id) {

        const user = await findByKeys(Users, { id });

        if (!user) {
            throw new HttpError(404, 'User Not Found!');
        };

        if (!(await AuthUtils.comparePasswords(oldPassword, user.password))) {
            throw new HttpError(401, 'Password does not match!');
        };

        await updateByKey(Users, {
            password: await AuthUtils.hashPassword(newPassword),
        }, { id });
        const updatedUser = await findByKeys(Users, { id });

        return updatedUser;
    }
}