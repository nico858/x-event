import Joi from 'joi';

const id = Joi.number().integer();
const eventId = Joi.number().integer();
const userId = Joi.number().integer();
const state = Joi.string();
const cost = Joi.number().precision(2);

export const createParticipantSchema = Joi.object({
    eventId: eventId.required(),
    userId: userId.required(),
    state: state.required(),
    cost: cost.required(),
});
  
export const updateParticipantSchema = Joi.object({
    eventId: eventId,
    state: state,
    cost: cost,
});
  
export const getParticipantSchema = Joi.object({
   id: id.required(),
});