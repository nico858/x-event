import { Sequelize } from 'sequelize';

import { config } from '../../src/config/config.js';

export const connection = new Sequelize(config.dbLink, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
        native: true
    }
});

import { ActivityModel } from "./activity.model.js";
import { BalanceModel } from "./balance.model.js";
import { ContactsModel } from "./contacts.model.js";
import { EventModel } from "./event.model.js";
import { ParticipantModel } from "./participant.model.js";
import { RegistrationModel } from "./registration.model.js";
import { UserModel } from "./user.model.js";


export const Activity = ActivityModel(connection, Sequelize);
export const Balance = BalanceModel(connection, Sequelize);
export const Contacts = ContactsModel(connection, Sequelize);
export const Event = EventModel(connection, Sequelize);
export const Participant = ParticipantModel(connection, Sequelize);
export const Registration = RegistrationModel(connection, Sequelize);
export const User = UserModel(connection, Sequelize);

// Associations
User.hasMany(Contacts, { as: 'contacts', foreignKey: 'id' });
Contacts.belongsTo(User, {  as: 'userContact', foreignKey: 'contact' });

User.hasMany(Event, { as: 'events', foreignKey: 'id' });
Event.belongsTo(User, {  as: 'owner', foreignKey: 'creator' });

Event.hasMany(Participant, { as: 'participants', foreignKey: 'id' });
Participant.belongsTo(Event, {  as: 'event', foreignKey: 'eventId' });

Event.hasMany(Balance, { as: 'balances', foreignKey: 'id' });
Balance.belongsTo(Event, {  as: 'event', foreignKey: 'eventId' });

Event.hasMany(Activity, { as: 'activities', foreignKey: 'id' });
Activity.belongsTo(Event, {  as: 'event', foreignKey: 'eventId' });

Participant.hasMany(Balance, { as: 'balances', foreignKey: 'id' });
Balance.belongsTo(Participant, {  as: 'participant', foreignKey: 'participantId' });

Participant.hasMany(Registration, { as: 'userRegistration', foreignKey: 'userId' });
Registration.belongsTo(Participant, {  as: 'participant', foreignKey: 'participantId' });

Activity.hasMany(Registration, { as: 'registrations', foreignKey: 'id' });
Registration.belongsTo(Activity, {  as: 'activity', foreignKey: 'activityId' });


connection.sync({ alter: true });
