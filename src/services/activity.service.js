import boom from '@hapi/boom';

import { Activity, User, Event, Registration, Participant } from '../../db/models/index.js';

export default class ActivityService {
  constructor() {}

  async create(data) {

    const { creatorId, eventId } = data;

    const event = await Event.findOne({ id: eventId });
    if (!event) {
      throw boom.notFound('Event not found');
    }

    // const participant = await Participant.findOne({ where: { userId: creatorId, eventId: eventId } });
    // if (!participant) {
    //   throw boom.notFound('The user is not a participant of the event');
    // }

    const newActivity = await Activity.create(data);

    const newCost = event.cost + newActivity.cost;
    await event.update({ cost: newCost })

    const newRegistration = await Registration.create({
      participantId: newActivity.creatorId,
      activityId: newActivity.id,
      percentage: 0
    });
    console.log('[1]');
    console.log(newActivity.id);
    console.log(newRegistration);
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

  async findByUser(creatorId) {
    const activities = await Activity.findAll({ where: { creatorId: creatorId } });
    if (!activities) {
      throw boom.notFound('The user does not have any activities')
    }
    return activities;
  }

  async findByEvent(eventId) {
    const activities = await Activity.findAll({ where: { eventId: eventId } });
    if (!activities) {
      throw boom.notFound('The event does not have any activities')
    }
    return activities;
  }

  async findByParticipant(userId) {
    const participations = await Participant.findAll({ where: { userId: userId } });
    if (!participations) {
      throw boom.notFound('The user is not participant of any events');
    }

    await Promise.all(participations.map(async (participation) => {
      const registrations = await Registration.findAll({ where: { participantId: participation.id } });
      await Promise.all(registrations.map(async (registration) => {
        const activity = await Activity.findByPk(registration.activityId);
        return activity;
      }));
    }));
  }  

  async findByParticipant(userId) {
    const events = await Event.findAll({
      include: [
        {
          model: Participant,
          where: { userId: userId }
        }
      ]
    })
    if (!events) {
      throw boom.notFound('The user is not participant of any events');
    }
    return events;
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