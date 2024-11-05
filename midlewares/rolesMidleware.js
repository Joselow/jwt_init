import { USER_ROLES } from "../constants/userRoles.js"

export const isAdmin = (req, res, next) => {
  const { role_id } = req.body
  if (USER_ROLES.ADMIN === role_id) {
    return next()
  }

  return res.status(403).json({ ok: false, message: 'Access denied. You are not an administartor' });
}