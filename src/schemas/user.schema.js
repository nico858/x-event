import Joi from 'joi';

const id = Joi.number().integer();
const firstName = Joi.string().max(40);
const lastName = Joi.string().max(40);
const email = Joi.string().email();
const password = Joi.string().min(6);
const nickName = Joi.string().min(3).max(15);
const photo = Joi.binary();
const active = Joi.boolean();

export const createUserSchema = Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required(),
    nickName: nickName.required(),
    photo: photo.required(),
});
  
export const updateUserSchema = Joi.object({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    nickName: nickName,
    photo: photo,
});
  
export const getUserSchema = Joi.object({
   id: id.required(),
});