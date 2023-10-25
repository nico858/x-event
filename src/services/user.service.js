import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import { User } from '../../db/models/index.js';

export default class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
      ...data,
      password: hash
    });
    return newUser;
  }

  async find() {
    const response = await User.findAll();
    return response;
  }

  async findByEmail(email) {
    const response = await User.findOne({ where: { email } });
    return response;
  }

  async findOne(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

  async logicDelete(id) {
    const user = await this.findOne(id);
    const updateActive = { active: 'inactive' };
    const response = await user.update(updateActive);
    return response;
  }
}