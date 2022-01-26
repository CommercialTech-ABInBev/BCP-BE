import Joi from 'joi';

export const email = Joi.string().trim().email({ minDomainSegments: 2 });

export const signupSchema = {
  fullName: Joi.string().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  role: Joi.string().required(),
  brand: Joi.string().trim(),
  location: Joi.string().trim(),
};

export const loginSchema = {
  email: email.required(),
  password: Joi.string().min(3).max(15).required().label('Password'),
};

export const verifyNewUserSchema = {
  token: Joi.string().trim().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
};

export const resetPassword = {
  oldPassword: Joi.string().min(3).max(15).required().label('OldPassword'),
  newPassword: Joi.string().min(3).max(15).required().label('newPassword'),
  repeatNewPassword: Joi.string()
    .min(3)
    .max(15)
    .required()
    .label('repeatNewPassword'),
};

export const forgotPasswordSchema = {
  email: email.required(),
};
export const forgotPasswordEmailSchema = {
  token: Joi.string().trim().required(),
  newPassword: Joi.string().min(3).max(15).required().label('newPassword'),
  repeatNewPassword: Joi.string()
    .min(3)
    .max(15)
    .required()
    .label('repeatNewPassword'),
};

export const editProfileSchema = {
  name: Joi.string().alphanum(),
  photoUrl: Joi.string().trim(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }),
  password: Joi.string().min(3).max(15).label('Password'),
  paymentMode: Joi.string().trim().label('Please enter payment mode'),
};
