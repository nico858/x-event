import Joi from 'joi';

const id = Joi.number().integer();
const eventId = Joi.number().integer();
const participantId = Joi.number().integer();
const balance = Joi.number().double();

export const createBalanceSchema = Joi.object({
    eventId: eventId.required(),
    participantId: participantId.required(),
    balance: balance.required(),
});
  
export const updateBalanceSchema = Joi.object({
    eventId: eventId,
    participantId: participantId,
    balance: balance,
});
  
export const getBalanceSchema = Joi.object({
   id: id.required(),
});