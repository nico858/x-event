import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import { Contacts } from '../../db/models/index.js';

export default class ContactService {
  constructor() {}

  async create(data) {
    const newContact = await Contact.create(data);
    return newContact;
  }

  async find() {
    const response = await Contact.findAll();
    return response;
  }

  async findOne(id) {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      throw boom.notFound('Contacts not found');
    }
    return contact;
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