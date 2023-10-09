import Joi from 'joi';

const id = Joi.number().integer();
const participantId = Joi.number().integer();
const activityId = Joi.number().integer();
const percentage = Joi.number().double();