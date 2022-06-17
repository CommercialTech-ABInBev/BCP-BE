import db from '../models';
import DbService from './dbservice';
import CommonService from './common';
import AuthUtils from '../utils/auth';
import { HttpError } from '@src/middlewares/api-error-validator';

const { hashPassword } = AuthUtils;
const { User } = db;
const { addEntity, findByKeys, updateByKey, deleteByKey, findMultipleByKey } =
  DbService;

export default class AuthService {
  async getUsers() {
    const Users = await findMultipleByKey(User);
    return Users;
  }
  async login({ email, password }) {
    const user = await findByKeys(User, { email });
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
      name: user.name,
      location: user.location,
      status: user.inviteStatus,
    };

    const token = CommonService.generateAuthToken(tokenPayload);
    user.dataValues.token = token;

    return user;
  }

  async signup(input) {
    const { email, password } = input;
    const previousUser = await findByKeys(User, { email });
    if (previousUser || previousUser.emailVerified) {
      throw new HttpError(
        401,
        `User already exist,Try verifying your email address!!!`
      );
    }

    const signUpdata = { ...input, password: await hashPassword(password) };

    const user = await addEntity(User, signUpdata);

    return user;
  }

  async resetPassword({ oldPassword, newPassword }, id) {
    const user = await findByKeys(User, { id });

    if (!user) throw new HttpError(404, 'User Not Found!');

    if (!(await AuthUtils.comparePasswords(oldPassword, user.password)))
      throw new HttpError(401, 'Password does not match!');

    await updateByKey(
      User,
      {
        password: await AuthUtils.hashPassword(newPassword),
      },
      { id }
    );
    const updatedUser = await findByKeys(User, { id });

    return updatedUser;
  }

  async updateuser(data, id) {
    const user = await findByKeys(User, { id });
    if (!user) throw new HttpError(404, 'User Not Found!');

    await updateByKey(
      User,
     data,
      { id }
    );
    const updatedUser = await findByKeys(User, { id });

    return updatedUser;
  }

  async deleteUser({ id }) {
    const user = await findByKeys(User, { id });

    if (!user) {
      throw new HttpError(404, 'User Not Found!');
    }
    const deleteProfile = await deleteByKey(User, { id });
    return deleteProfile;
  }
}
