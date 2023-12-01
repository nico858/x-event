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
User.hasMany(Contacts, { as: 'contact', foreignKey: 'id' });
Contacts.belongsTo(User, {  as: 'userContact', foreignKey: 'userId' });

User.hasMany(Participant, { as: 'participation', foreignKey: 'id' });
Participant.belongsTo(User, {  as: 'user', foreignKey: 'userId' });

Event.hasMany(Participant, { as: 'participants', foreignKey: 'userId' });
Participant.belongsTo(Event, {  as: 'events', foreignKey: 'eventId' });

Activity.hasMany(Balance, { as: 'balances', foreignKey: 'id' });
Balance.belongsTo(Activity, {  as: 'activity', foreignKey: 'activityId' });

Event.hasMany(Activity, { as: 'activities', foreignKey: 'id' });
Activity.belongsTo(Event, {  as: 'event', foreignKey: 'eventId' });

Participant.hasMany(Balance, { as: 'balances', foreignKey: 'id' });
Balance.belongsTo(Participant, {  as: 'participant', foreignKey: 'participantId' });

User.hasMany(Registration, { as: 'userRegistration', foreignKey: 'id' });
Registration.belongsTo(User, {  as: 'regist', foreignKey: 'userId' });

Activity.hasMany(Registration, { as: 'registrations', foreignKey: 'id' });
Registration.belongsTo(Activity, {  as: 'activity', foreignKey: 'activityId' });


await connection.sync({ alter: true });
