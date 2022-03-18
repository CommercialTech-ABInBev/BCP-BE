import bcrypt from 'bcryptjs';
import CommonService from '../services/common';
const { Parser } = require('json2csv');

export default class AuthService {
  static async hashPassword(password, salt = 10) {
    return await bcrypt.hash(password, salt);
  }

  static async comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static createPasswordResetLink(id) {
    const token = CommonService.generateToken(id);
    return {
      link: `http:localhost:3000/users/blank?id=${id}&token=${token}`,
      token,
    };
  }

  static downloadResource(res, fileName, fields, data) {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
  }
}
