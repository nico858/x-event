import express from 'express';
import swaggerjsdoc from 'swagger-jsdoc';
import swagger from 'swagger-ui-express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import routerAPi from './routes/index.js';
import { connection } from '../db/models/index.js';
import { LocalStrategy } from './utils/aut/strategies/local.strategy.js';
import { errorHandler, boomErrorHandler, ormErrorHandler } from './middlewares/error.hanlder.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
routerAPi(app);

app.use(express.json());
app.use(morgan('dev'));

app.use(
    session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: false,
    })
);

//Executing error handlers
app.use(ormErrorHandler);
app.use(errorHandler);
app.use(boomErrorHandler);


passport.use(LocalStrategy);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'x-event',
            version: '1.0.0',
            description: 'Event manager for www project',
        },
        servers: [
            {
                url: 'http://localhost:3000/'
            }
        ]
    },
    apis: ['./src/routes/*.js']
}
const spacs = swaggerjsdoc(options);
app.use(
    '/docs',
    swagger.serve,
    swagger.setup(spacs)
)

app.listen(port, async () => {
    try{
        await connection.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`App listening at port: ${port}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});