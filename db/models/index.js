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

// import connection from "../database.js";
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


connection.sync({ alter: true });
