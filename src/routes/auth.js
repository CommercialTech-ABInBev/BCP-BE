import { Router } from 'express';
import { UserController } from '../controllers/user';
import { validationMiddleware } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/auth'
import {
    signupSchema,
    loginSchema,
    resetPassword,
} from '../validations/auth.validation';

const router = Router();
const usercontroller = new UserController();

router.put('/accept-invite', usercontroller.acceptInvite);
router.delete('/delete-user', usercontroller.adminDeleteUserProfile)
router.post('/login', validationMiddleware(loginSchema), usercontroller.login);
router.post('/send-invite', validationMiddleware(signupSchema), usercontroller.adminSendInvite);
router.post('/reset-password', authMiddleware, validationMiddleware(resetPassword), usercontroller.resetPassword);

export default router;