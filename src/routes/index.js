import express from 'express';

import activityRouter from './activity.router.js';
import authRouter from './auth.router.js';
import eventRouter from './event.router.js';
import userRouter from './user.router.js';;



export default function routerApi(app) {
  const router = express.Router();
  app.use(express.json());
  
  app.use('/', router);
  
  router.use('/activity', activityRouter);
  router.use('/auth', authRouter)
  router.use('/event', eventRouter)
  router.use('/user', userRouter);
//   router.use('/address', addressRouter);
//   router.use('/orderDate', orderDateRouter);
//   router.use('/orderDetail', orderDetailRouter);
//   router.use('/products', productsRouter);
//   router.use('/users', usersRouter);
//   router.use('/auth', authRouter);
}