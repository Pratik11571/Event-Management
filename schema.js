const Joi = require("joi");

module.exports.eventSchema = Joi.object({
  organizationName: Joi.string().required(),
  eventName: Joi.string().required(),
  description: Joi.string().optional(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  date: Joi.object({
    from: Joi.date().required(),
    to: Joi.date().required().greater(Joi.ref("from")), // Ensures 'to' is after 'from'
  }).required(),
  time: Joi.object({
    from: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .required(), // Validates 24-hour format (HH:mm)
    to: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .required(),
  }).required(),
  skills: Joi.string()
    .valid("Teaching", "Field Work", "Health Care", "Fitness Coaching", "Animal Care", "Others")
    .required(),
  image: Joi.object({
    filename: Joi.string().optional(),
    url: Joi.string().uri().optional(),
  }).optional(),
  contactNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required(), // Allows optional country code and ensures 10-15 digits
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Validates email format
    .required(),
  owner: Joi.string().optional(), // Assuming ObjectId is stored as a string
  volunteers: Joi.array().items(Joi.string()).optional(), // Array of ObjectIds
  coordinates: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(), // Ensures exactly two numbers (lat, long)
  }).required(),
});