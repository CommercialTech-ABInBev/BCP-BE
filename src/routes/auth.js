import { Router } from 'express';

import { UserController } from '../controllers/auth';
import { authMiddleware } from '../middlewares/auth';
import { validationMiddleware } from '../middlewares/validation';
import {
    signupSchema,
    loginSchema,
    resetPassword,
} from '../validations/auth.validation';
import { verifyRoles } from '../middlewares/rolemgt';

const router = Router();
const usercontroller = new UserController();


router.delete(
    '/delete-user',
    authMiddleware,
    verifyRoles(['AM']),
    usercontroller.adminDeleteUserProfile
);
router.post('/login', validationMiddleware(loginSchema), usercontroller.login);

router.post(
    '/reset-password',
    authMiddleware,
    validationMiddleware(resetPassword),
    usercontroller.resetPassword
);


export default router;