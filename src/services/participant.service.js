import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import { Participant, User, Contacts, Event } from '../../db/models/index.js';

export default class ParticipantService {
  constructor() {}

  async create(data) {
    const userId = data.userId;
    
    const isUser = await User.findOne({ where: { id: userId } });
    if (!isUser) {
      throw boom.notFound('User not found');
    }

    const event = await Event.findByPk(data.eventId);
    if (!event) {
      throw boom.notFound('Event not found');
    }

    const isParticipant = await Participant.findOne({ where: { userId: userId, eventId: data.eventId } });
    if (isParticipant) {
      throw boom.badRequest('The user is already a participant');
    }

    const isContact = await Contacts.findOne({ where: { userId: event.creator, contact: data.userId, state: "accepted" } });
    const isContact2 = await Contacts.findOne({ where: { userId: data.userId, contact: event.creator, state: "accepted" } });
    if (event.creator !== userId && !isContact) {
      if (!isContact2) {
        throw boom.badRequest('The user is not a contact of the creator');
      }   
    }

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
    if (response.length === 0) {
      throw boom.notFound('The participant is not in the event')
    }
    return response;
  }

  async acceptInvitation(userId, eventId) {
    const participant = await Participant.findOne({ where: { userId: userId, eventId: eventId } });
    if (!participant) {
      return (`The ${userId} is not a participant of the event ${eventId}`);
    }
    const response = await participant.update({ state: 'accepted' });
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