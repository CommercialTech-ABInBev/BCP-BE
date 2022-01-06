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
}