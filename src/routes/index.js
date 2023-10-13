import express from 'express';

// routes for new project
// import eventRouter from './events.router.js';

import activityRouter from './activity.router.js';
import userRouter from './user.router.js';
// import addressRouter from './address.router.js';
// import orderDateRouter from './orderDate.router.js';
// import orderDetailRouter from './orderDetail.router.js';
// import productsRouter from './products.router.js';
// import usersRouter from './users.router.js';
// import authRouter from './auth.router.js';



export default function routerApi(app) {
  const router = express.Router();
  app.use(express.json());
  
  app.use('/', router);
  
  // router.use('/eventCreation', eventRouter);
  router.use('/activity', activityRouter);
  router.use('/user', userRouter);
//   router.use('/address', addressRouter);
//   router.use('/orderDate', orderDateRouter);
//   router.use('/orderDetail', orderDetailRouter);
//   router.use('/products', productsRouter);
//   router.use('/users', usersRouter);
//   router.use('/auth', authRouter);
}