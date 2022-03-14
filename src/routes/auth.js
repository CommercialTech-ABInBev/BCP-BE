import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth';
import { UserController } from '../controllers/auth';
import { validationMiddleware } from '../middlewares/validation';
import { loginSchema, resetPassword } from '../validations/auth.validation';

const router = Router();
const usercontroller = new UserController();

router.delete('/delete-user', usercontroller.adminDeleteUserProfile);
router.post('/login', validationMiddleware(loginSchema), usercontroller.login);
router.post(
    '/reset-password',
    authMiddleware,
    validationMiddleware(resetPassword),
    usercontroller.resetPassword
);

export default router;