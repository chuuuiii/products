import express from 'express';
import { signIn, login } from '../controllers/user.controller';

const router = express.Router();

// router.get('/',);

router.post('/signin', signIn);

router.post('/login', login);

// router.post('/logout',);

export default router;