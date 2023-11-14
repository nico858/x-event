import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import { Balance } from '../../db/models/index.js';

export default class BalanceService {
  constructor() {}

  async create(data) {
    const newBalance = await Balance.create(data);
    return newBalance;
  }

  async find() {
    const response = await Balance.findAll();
    return response;
  }

  async findOne(id) {
    const Balance = await Balance.findByPk(id);
    if (!Balance) {
      throw boom.notFound('Balance not found');
    }
    return Balance;
  }

  async update(id, changes) {
    const Balance = await this.findOne(id);
    const response = await Balance.update(changes);
    return response;
  }

  async delete(id) {
    const Balance = await this.findOne(id);
    await Balance.destroy();
    return { id };
  }
}