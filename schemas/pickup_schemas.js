import Joi from "joi";

export const pickupSchema = Joi.object({
  wasteType: Joi.string()
  .required()
  .messages({
    "string.empty": "Please select a waste type.",
    "any.required": "Waste type is required."
  }),

  location: Joi.string()
  .required()
  .messages({
    "string.empty": "Please enter your pickup location.",
    "any.required": "Location is required."
  }),

  date: Joi.string()
  .required()
  .messages({
    "date.base": "Please choose a valid date.",
    "any.required": "Date is required."
  }),

  time: Joi.string()
  .required()
  .messages({
    "string.empty": "Please enter the pickup time.",
    "any.required": "Time is required."
  })
});
