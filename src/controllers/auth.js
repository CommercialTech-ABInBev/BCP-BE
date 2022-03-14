import UserService from '../services/auth';

const userService = new UserService();
export class UserController {
  async login(req, res, next) {
    try {
      const newUser = await userService.login(req.body);
      res.status(200).send(newUser);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { id } = req.tokenData;
      await userService.resetPassword(req.body, id);

      res.send({
        message: 'Password reset sucessfully. Proceed to login!',
      });
    } catch (error) {
      next(error);
    }
  }

  async adminDeleteUserProfile(req, res, next) {
    try {
      await userService.deleteUser(req.query);
      res.send({
        message: 'User Softdeleted!',
      });
    } catch (error) {
      next(error);
    }
  }
}