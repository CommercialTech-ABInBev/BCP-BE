import env from '@src/config/env';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
const { JWT_SECRET_KEY, TOKEN_EXPIRES, SENDGRID_API_KEY } = env;

export default class CommonService {
  static generateToken(sub) {
    return jwt.sign({ sub }, JWT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRES,
    });
  }

  static decodeToken(token) {
    return jwt.verify(token, JWT_SECRET_KEY);
  }

  static async sendEmail(message) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    await sgMail.send(message);
  }
}
