import CommonService from './common';
import env from '../config/env';
import RabbitMQService from './messageQueue';
import DbService from '../repositories';
import { HttpError } from '@src/middlewares/api-error-validator';
import db from '../models';
const { Tokens, Users } = db;

const { addEntity, findByKeys } = DbService;

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
    const { email, firstName } = userData;

    const token = CommonService.generateToken(email);

    await addEntity(Tokens, {
      type: 'signup-verify-token',
      token,
      email,
    });

    const body = {
      ...userData,
      role: 'user',
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
}
