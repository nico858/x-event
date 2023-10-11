import Joi from 'joi';

const id = Joi.number().integer();
const eventId = Joi.number().integer();
const state = Joi.string();
const cost = Joi.number().double();

export const createParticipantSchema = Joi.object({
    eventId: eventId.required(),
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