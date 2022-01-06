import UserService from '../services/users';

const userService = new UserService();
export class UserController {
    async create(req, res, next) {
        try {
            const newUser = await userService.signup(req.body);
            res.status(201).send(newUser);
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
            const userId = req.context.userId;
            await userService.resetPassword(req.body, userId);

            res.send({
                message: 'Password reset sucessfully. Proceed to login!',
            });
        } catch (error) {
            next(error);
        }
    }

}