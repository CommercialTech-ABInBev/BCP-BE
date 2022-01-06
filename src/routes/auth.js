import { Router } from 'express';
import { UserController } from '../controllers/user';
import { validationMiddleware } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/auth'
import {
    signupSchema,
    loginSchema,
    resetPassword
} from '../validations/auth.validation';

const router = Router();
const usercontroller = new UserController();

router.post('/signup', validationMiddleware(signupSchema), usercontroller.create);
router.post('/login', validationMiddleware(loginSchema), usercontroller.login);
router.post('/resetpassword', authMiddleware, validationMiddleware(resetPassword), usercontroller.resetPassword)

export default router;