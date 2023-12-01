import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import { Registration, Participant } from '../../db/models/index.js';

export default class RegistrationService {
  constructor() {}

  async create(data) {
    const participantId = data.participantId;
    
    const isParticipant = await Participant.findOne({ where: { id: participantId } });
    if (!isParticipant) {
      throw boom.notFound('The user is not a participant of the event');
    }

    const newRegistration = await Registration.create(data);
    return newRegistration;
  }

  async find() {
    const response = await Registration.findAll();
    return response;
  }

  async findOne(id) {
    const registration = await Registration.findByPk(id);
    if (!registration) {
      throw boom.notFound('Registration not found');
    }
    return registration;
  }

  async findByActivity(activityId) {
    const registrations = await Registration.findAll({ where: { activityId: activityId } });
    if (registrations.length === 0) {
      throw boom.notFound('Registrations not found');
    }
    return registrations;
  }

  async findByActivityAndUser(activityId, userId) {
    const registration = await Registration.findOne({ where: { activityId: activityId, userId: userId } });
    if (!registration) {
      throw boom.notFound('Registration not found');
    }
    return registration;
  }

  async update(id, changes) {
    const registration = await this.findOne(id);
    const response = await registration.update(changes);
    return response;
  }

  async delete(id) {
    const registration = await this.findOne(id);
    await registration.destroy();
    return { id };
  }
}