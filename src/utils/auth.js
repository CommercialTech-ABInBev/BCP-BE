import bcrypt from 'bcryptjs';
import CommonService from '../services/common';

export default class AuthService {
  static async hashPassword(password, salt = 10) {
    return await bcrypt.hash(password, salt);
  }

  static async comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static createPasswordResetLink(id) {
    const token = CommonService.generateToken(id);
    //Note: Link for the client side, where the id and token from query will be supplied
    //alongside a newpassword string hiting the veriypassword endpoint
    return {
      link: `http:localhost:3000/users/blank?id=${id}&token=${token}`,
      token,
    };
  }
}
