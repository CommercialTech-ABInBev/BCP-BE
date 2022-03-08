import { Router } from 'express';
import AddData from './addData';

const router = Router();

router.use('/adddata', AddData);


export default router;