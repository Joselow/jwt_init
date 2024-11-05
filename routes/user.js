import { Router } from "express";

import  { register, login, getProfile , getUsers}  from '../controllers/user.js'
import { loginUser, resgisterUser } from "../midlewares/userMidleware.js";
import { verifyJWT } from "../midlewares/jwtMidleware.js";
import { isAdmin } from "../midlewares/rolesMidleware.js";

const router = Router()

router.post('/register', [resgisterUser] , register)
router.post('/login', [loginUser],  login)
router.get('/profile', [verifyJWT],  getProfile)

router.get('/', [verifyJWT, isAdmin], getUsers)


export default router