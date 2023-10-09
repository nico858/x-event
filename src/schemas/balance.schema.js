import Joi from 'joi';

const id = Joi.number().integer();
const eventId = Joi.number().integer();
const participantId = Joi.number().integer();
const balance = Joi.number().double();