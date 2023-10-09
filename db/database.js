import { Sequelize  } from 'sequelize';

import { config } from '../src/config/config.js';

const connection = new Sequelize(config.dbLink, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
        native: true
    }
});

export default connection;