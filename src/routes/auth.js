import { Router } from 'express';
import { UserController } from '../controllers/user';
import { validationMiddleware } from '../middlewares/validation';
import {
    signupSchema,
    loginSchema
} from '../validations/auth.validation';

const router = Router();
const usercontroller = new UserController();

router.post('/signup', validationMiddleware(signupSchema), usercontroller.create);
router.post('/login', validationMiddleware(loginSchema), usercontroller.login);

export default router;