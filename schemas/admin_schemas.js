import Joi from "joi"

export const adminLoginSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({
      "string.empty": "Please enter your email address.",
      "any.required": "Email is required."
    }),

  password: Joi.string()
    .min(4)
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 4 characters long."
    })
});