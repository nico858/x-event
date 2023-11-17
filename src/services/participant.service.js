import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import { Participant } from '../../db/models/index.js';

export default class ParticipantService {
  constructor() {}

  async create(data) {
    const newParticipant = await Participant.create(data);
    return newParticipant;
  }

  async find() {
    const response = await Participant.findAll();
    return response;
  }

  async findOne(id) {
    const participant = await Participant.findByPk(id);
    if (!participant) {
      throw boom.notFound('Participant not found');
    }
    return participant;
  }

  async findByUser(userId) {
    const response = await Participant.findAll({ where: { userId } });
    if (!response) {
      throw boom.notFound('The user is not a participant')
    }
    return response;
  }

  async findByEvent(eventId) {
    const response = await Participant.findAll({ where: { eventId } });
    if (!response) {
      throw boom.notFound('The participant is not in the event')
    }
    return response;
  }

  async update(id, changes) {
    const participant = await this.findOne(id);
    const response = await participant.update(changes);
    return response;
  }

  async delete(id) {
    const participant = await this.findOne(id);
    await participant.destroy();
    return { id };
  }
}