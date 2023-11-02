import Joi from 'joi';

const id = Joi.number().integer();
const creator = Joi.number().integer();
const name = Joi.string().min(5).max(40);
const description = Joi.string().min(5).max(500);
const type = Joi.string();
const photo = Joi.binary();
const cost = Joi.number().precision(2);
const active = Joi.boolean();

export const createEventSchema = Joi.object({
    creator: creator.required(),
    name: name.required(),
    description: description.required(),
    type: type.required(),
    photo: photo.required(),
    cost: cost.required(),
});
  
export const updateEventSchema = Joi.object({
    creator: creator,
    name: name,
    description: description,
    type: type,
    photo: photo,
    cost: cost,
});
  
export const getEventSchema = Joi.object({
   id: id.required(),
});