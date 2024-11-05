import { userModel } from "../models/user.js";
import { comparePasswordHashed, hashData } from "../utils/hashData.js";
import { generateToken } from "../utils/jwt.js";
import { responseSuccess } from "../utils/responses.js";


const register = async (req, res) => {
  try {      
    const { username, email, password } = req.body
    const accountExist = await userModel.existsAccountByMail(email)
    
    if (accountExist) {
      return res.json({ ok: false, message: 'The email already has an account'})
    }
    const passwordHashed = await hashData(password)

    const { uid, role_id } = await userModel.create({ email, password: passwordHashed, username })
    const userCreated = { uid, username, email, role_id }
    console.log(userCreated);

    const token = generateToken(userCreated)
    
    return responseSuccess({ 
      res, 
      message: 'user created successfully', 
      data: token, 
      code: 201 
    })
    
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      ok: false,
      msg: 'Internal error server'
    })
  }
}

const login = async(req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ ok: false, message: 'Invalid credentials'})
    }

    console.log(user);

    const isPasswordValid = await comparePasswordHashed(password, user.password);
    const token = generateToken({ 
      uid: user.uid, 
      email: user.email, 
      username: user.username ,
      role_id: user.role_id
    })

    if (isPasswordValid) {
      return responseSuccess({
        res, message: 'logged in successfully', data: { token }
      })
    } 

    throw new Error('Invalid credentials') 
    
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

const getProfile = async (req, res) => {
  const { email } = req.body

  try {
    const user = await userModel.getUserByEmail(email)
    responseSuccess({
      res, data: { email: user.email, username: user.username, uid: user.uid}
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
  
}


const getUsers = async(req, res) => {
  try {
    const users = await userModel.getUsers()

    responseSuccess({
      res, data: users
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

export {
  login, register, getProfile, getUsers
}