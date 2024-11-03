import Joi from "joi";

export const UserSchema = Joi.object({
  username: Joi.string()
    .min(6)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
})


export const LoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});