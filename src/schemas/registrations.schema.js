import Joi from 'joi';

const id = Joi.number().integer();
const participantId = Joi.number().integer();
const activityId = Joi.number().integer();
const percentage = Joi.number().presicion(2);

export const createRegistrationSchema = Joi.object({
    participantId: participantId.required(),
    activityId: activityId.required(),
    percentage: percentage.required(),
});
  
export const updateRegistrationSchema = Joi.object({
    participantId: participantId,
    activityId: activityId,
    percentage: percentage,
});
  
export const getRegistrationSchema = Joi.object({
   id: id.required(),
});