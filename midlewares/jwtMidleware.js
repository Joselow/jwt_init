import { verifyToken } from "../utils/jwt.js"

export const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) { 
    return res.status(401).json({
      ok: false,
      message: 'Token is requiered'
    })
  }
  try {
    const { email, uid, role_id } = verifyToken(token)
    req.body = { email, uid, role_id }
    next()
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Invalid token' })
  }
}

