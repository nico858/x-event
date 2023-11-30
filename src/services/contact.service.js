import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import { Contacts, User } from '../../db/models/index.js';

export default class ContactService {
  constructor() {}

  async create(data) {
    const isUser = await User.findOne({ where: { id: data.userId } });
    const isContactUser = await User.findOne({ where: { id: data.contact } });
    if (!isUser || !isContactUser) {
      throw boom.notFound('User not found');
    }
    
    const check1 = await Contacts.findOne({ where: { contact: data.contact, userId: data.userId } });
    const check2 = await Contacts.findOne({ where: { contact: data.userId, userId: data.contact } });
    if (check1 || check2) {
      throw boom.badRequest('Contact already exists');
    }
    const newContact = await Contacts.create(data);
    return newContact;
  }

  async find() {
    const response = await Contacts.findAll();
    return response;
  }

  async findOne(id) {
    const contact = await Contacts.findByPk(id);
    if (!contact) {
      throw boom.notFound('Contacts not found');
    }
    return contact;
  }

  async findByUserId(userId, contactId) {
    const response = await Contacts.findAll({ where: { userId: userId }});
    if (!response) {
      throw boom.notFound('Contact not found');
    }
    return response;
  }

  async updateStateByContact(userId, contactId, state) {
    const contact = await Contacts.findOne({ where: { userId: userId, contact: contactId }});
    if (!contact) {
      throw boom.notFound('Contact not found');
    }
    const response = await contact.update(state);
    return response;
  }

  async update(id, changes) {
    const contact = await this.findOne(id);
    const response = await contact.update(changes);
    return response;
  }

  async delete(id) {
    const contact = await this.findOne(id);
    await contact.destroy();
    return { id };
  }
}