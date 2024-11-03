import bcrypt from "bcrypt"

export const hashData = async (data) => {
  const salt = await bcrypt.genSalt(10)
  const hashedData = await bcrypt.hash(data, salt)
  return hashedData
}

export const comparePasswordHashed = async (hashed, value) => {
  return await bcrypt.compare(hashed, value);
}