import boom from '@hapi/boom';

import { User } from '../../db/models/index.js';

export default class UserService {
  constructor() {}

  async create(data) {
    const newUser = await User.create(data);
    return newUser;
  }

  async find() {
    const response = await User.findAll();
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