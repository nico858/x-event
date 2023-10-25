import boom from '@hapi/boom';

import { Event } from '../../db/models/index.js';

export default class EventService {
  constructor() {}

  async create(data) {
    const newEvent = await Event.create(data);
    return newEvent;
  }

  async find() {
    const response = await Event.findAll();
    return response;
  }

  async findOne(id) {
    const event = await Event.findByPk(id);
    if (!event) {
      throw boom.notFound('Event not found');
    }
    return event;
  }

  async update(id, changes) {
    const event = await this.findOne(id);
    const response = await event.update(changes);
    return response;
  }

  async delete(id) {
    const event = await this.findOne(id);
    await event.destroy();
    return { id };
  }

  async logicDelete(id) {
    const event = await this.findOne(id);
    const updateActive = { active: 'inactive' };
    const response = await event.update(updateActive);
    return response;
  }
}