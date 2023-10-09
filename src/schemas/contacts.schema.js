import Joi from 'joi';

const id = Joi.number().integer();
const contact = Joi.number().integer();
const email = Joi.string().email();
const state = Joi.string();