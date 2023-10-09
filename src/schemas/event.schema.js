import Joi from 'joi';

const id = Joi.number().integer();
const creator = Joi.number().integer();
const name = Joi.string().min(5).max(40);
const description = Joi.string().min(5).max(40);
const type = Joi.string();
const photo = Joi.binary();
const cost = Joi.number().double();
const active = Joi.boolean();