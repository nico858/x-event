import boom from '@hapi/boom';

import { Event, Participant } from '../../db/models/index.js';

export default class EventService {
  constructor() {}

  async create(data) {
    const newEvent = await Event.create(data);

    const newParticipant = await Participant.create({
      eventId: newEvent.id,
      userId: newEvent.creator,
      state: 'accepted',
      cost: 0
    });

    console.log(newParticipant);
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

  async findByUser(userId) {
    const events = await Event.findAll({ where: { creator: userId } })
    if (!events) {
      throw boom.notFound('The user does not have any events');
    }
    return events;
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