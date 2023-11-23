import Joi from 'joi';

const id = Joi.number().integer();
const contact = Joi.number().integer();
const userId = Joi.number().integer();
const state = Joi.string();

export const createContactSchema = Joi.object({
    contact: contact.required(),
    userId: userId.required(),
    state: state.required(),
});
  
export const updateContactSchema = Joi.object({
    contact: contact,
    userId: userId,
    state: state,
});
  
export const getContactSchema = Joi.object({
   id: id.required(),
});