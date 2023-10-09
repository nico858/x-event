import Joi from 'joi';

const id = Joi.number().integer();
const eventId = Joi.number().integer();
const state = Joi.string();
const cost = Joi.number().double();