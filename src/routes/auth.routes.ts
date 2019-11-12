import { Router } from 'express';
const router: Router = Router(); 

import { TokenValidation } from '../helpers/verifyToken';

import { SignIn, SignUp, Profile } from '../controller/auth.controller';

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/profile', TokenValidation, Profile);

export default router;