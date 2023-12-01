import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import { Balance, User, Activity, Registration, Participant } from '../../db/models/index.js';

export default class BalanceService {
  constructor() {}

  async create(data) {
    const user = await User.findOne(data.userId);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const activity = await Activity.findOne(data.activityId);
    if (!activity) {
      throw boom.notFound('Activity not found');
    }
    const registration = await Registration.findByActivityAndUser(data.activityId, data.userId);
    if (!registration) {
      throw boom.notFound('Registration not found');
    }

    if (data.debtor !== null) {
      const ownDebt = activity.cost * (registration.percentage / 100);
      if (data.balance < ownDebt) {
        throw boom.notFound('You cannot lend if you dont pay your own debt first');
      }
      const debtor = await User.findOne(data.debtor);
      if (!debtor) {
        throw boom.notFound('Debtor not found');
      }
      const debtorParticipation = await Participant.findOne({ where: { userId: data.debtor, eventId: activity.eventId } });
      if (!debtorParticipation) {
        throw boom.notFound('The debtor is not a participant of the event');
      }
      const loan = ownDebt - data.balance;
      debtorParticipation.update({ cost: debtorParticipation.cost - loan });
    }
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