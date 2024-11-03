import { formatValidationErrors } from "../helpers/validations/formatValidationErrors.js"
import { LoginSchema, UserSchema } from "../helpers/validations/user.js"

export const resgisterUser = async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    const objectValidated = await UserSchema.validateAsync({ username, email, password }, { 
      presence: "required", 
      abortEarly: false 
    })
    req.body = objectValidated
    next()
  } catch (error) {
    const errors = formatValidationErrors(error)
    console.log(errors);
    res.status(400).json({ ok: false, errors })
  }
}

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const objectValidated = await LoginSchema.validateAsync({ email, password }, { 
      presence: "required", 
      abortEarly: false 
    })
    req.body = objectValidated
    next()
  } catch (error) {
    const errors = formatValidationErrors(error)
    console.log(errors);
    res.status(400).json({ ok: false, errors })
  }
}