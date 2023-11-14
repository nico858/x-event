import Joi from 'joi';

const id = Joi.number().integer();
const contact = Joi.number().integer();
const email = Joi.string().email();
const state = Joi.string();

export const createContactSchema = Joi.object({
    contact: contact.required(),
    email: email.required(),
    state: state.required(),
});
  
export const updateContactSchema = Joi.object({
    contact: contact,
    email: email,
    state: state,
});
  
export const getContactSchema = Joi.object({
   id: id.required(),
});