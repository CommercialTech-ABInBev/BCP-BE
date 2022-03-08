import db from '../models';
import env from '../config/env';
import CommonService from './common';
import AuthUtils from '../utils/auth';
import DbService from './generalService';
import { HttpError } from '@src/middlewares/api-error-validator';

const { Users } = db;
const { addEntity, findByKeys, updateByKey, deleteByKey } = DbService;

export default class AuthService {
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
        };

        const token = CommonService.generateAuthToken(tokenPayload);

        return { user, token };
    }
}