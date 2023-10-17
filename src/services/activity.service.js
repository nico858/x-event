import boom from '@hapi/boom';

import { Activity } from '../../db/models/index.js';

export default class ActivityService {
  constructor() {}

  async create(data) {
    const newActivity = await Activity.create(data);
    return newActivity;
  }

  async find() {
    const response = await Activity.findAll();
    return response;
  }

  async findOne(id) {
    const activity = await Activity.findByPk(id);
    if (!activity) {
      throw boom.notFound('Activity not found');
    }
    return activity;
  }

  async update(id, changes) {
    const activity = await this.findOne(id);
    const response = await activity.update(changes);
    return response;
  }

  async delete(id) {
    const activity = await this.findOne(id);
    await activity.destroy();
    return { id };
  }

  async logicDelete(id) {
    const activity = await this.findOne(id);
    const updateActive = { active: 'inactive' };
    const response = await activity.update(updateActive);
    return response;
  }
}