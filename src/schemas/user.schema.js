import Joi from 'joi';

const id = Joi.number().integer();
const firstName = Joi.string().max(40);
const lastName = Joi.string().max(40);
const email = Joi.string().email();
const password = Joi.string().min(6);
const nickName = Joi.string().min(3).max(15);
const photo = Joi.binary();
const active = Joi.boolean();