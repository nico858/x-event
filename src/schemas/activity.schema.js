import Joi from 'joi';

const id = Joi.number().integer();
const eventId = Joi.number().integer();
const creatorId = Joi.number().integer();
const description = Joi.string().min(5).max(40);
const cost = Joi.number().double();
const state = Joi.string();
const active = Joi.boolean();