import { Router } from 'express';
import { UserController } from '../controllers/user';

const router = Router();
const usercontroller = new UserController();

router.post('/signup', usercontroller.create);
router.post('/login', usercontroller.login);
export default router;