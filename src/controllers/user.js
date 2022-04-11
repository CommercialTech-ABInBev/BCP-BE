import UserService from '../services/users';

const userService = new UserService();
export class UserController {
  async adminSendInvite(req, res, next) {
    try {
      const newUser = await userService.createInvite(req.body);
      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  }

  async acceptInvite(req, res, next) {
    try {
      const { email, token } = req.query;
      const updateUser = await userService.acceptInviteService(
        req.body,
        email,
        token
      );

      res.status(200).send(updateUser);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const newUser = await userService.login(req.body);
      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const userId = req.tokenData.id;
      await userService.resetPassword(req.body, userId);

      res.send({
        message: 'Password reset sucessfully. Proceed to login!',
      });
    } catch (error) {
      next(error);
    }
  }

  async adminDeleteUserProfile(req, res, next) {
    try {
      await userService.softDeleteUser(req.query);
      res.send({
        message: 'User Softdeleted!',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const data = await userService.editCustomer(req.body, req.query.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const data = await userService.getAllUsers(req.query);

      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}
