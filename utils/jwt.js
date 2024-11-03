import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const generateToken = (data) => {
  const payload = data

  const options = {
    expiresIn: '1h', // Tiempo de expiración del token
  };

  const token = jwt.sign(payload, SECRET_KEY, options);
  return token;
};

export const verifyToken = (token) => {
  const payload = jwt.verify(token, SECRET_KEY)
  return payload
}