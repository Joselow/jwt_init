import { verifyToken } from "../utils/jwt.js"


export const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) { 
    return res.status(400).json({
      ok: false,
      message: 'Invalid token'
    })
  }
  try {
    const { email, uid } = verifyToken(token)
    req.body = { email, uid }
    next()
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Invalid token' })
  }
}