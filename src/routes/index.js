import express from 'express';

import activityRouter from './activity.router.js';
import authRouter from './auth.router.js';
import balanceRouter from './balance.router.js';
import contactRouter from './contact.router.js';
import eventRouter from './event.router.js';
import participantRouter from './participant.router.js';
import registrationRouter from './registration.router.js';
import userRouter from './user.router.js';;



export default function routerApi(app) {
  const router = express.Router();
  app.use(express.json());
  
  app.use('/', router);
  
  router.use('/activity', activityRouter);
  router.use('/auth', authRouter)
  router.use('/balance', balanceRouter)
  router.use('/contact', contactRouter)
  router.use('/event', eventRouter)
  router.use('/participant', participantRouter)
  router.use('/registration', registrationRouter)
  router.use('/user', userRouter);
}