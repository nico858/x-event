import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import { config } from '../config/config.js';
import UserService from './user.service.js';

const service = new UserService();

export default class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized(), false;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized(), false;
    }
    return user;
  }

  signToken(user) {
    const payload = {
        sub: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        nickName: user.nickName,
        photo: user.photo,
        active: user.active,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
        user,
        token
    }
  }
}