import Joi from 'joi';

const id = Joi.number().integer();
const name = Joi.string().min(5).max(20);
const eventId = Joi.number().integer();
const creatorId = Joi.number().integer();
const description = Joi.string().min(5).max(500);
const cost = Joi.number().precision(2);
const state = Joi.string();
const active = Joi.boolean();

export const createActivitySchema = Joi.object({
    eventId: eventId.required(),
    creatorId: creatorId.required(),
    name: name.required(),
    description: description.required(),
    cost: cost.required(),
    state: state.required(),
});
  
export const updateActivitySchema = Joi.object({
    eventId: eventId,
    creatorId: creatorId,
    name: name,
    description: description,
    cost: cost,
    state: state,
});
  
export const getActivitySchema = Joi.object({
   id: id.required(),
});