/**
 * @swagger
 * components:
 *  schemas:
 *   Address:
 *    type: object
 *    required:
 *      - nomencature
 *      - detail
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the address
 *      clientId:
 *        type: string
 *        description: The client id
 *      nomencature:
 *        type: string
 *        description: The address nomencature
 *      detail:
 *        type: string
 *        description: The address detail
*/
/**
 * @swagger
 * tags:
 *   name: Address
 *   description: The address managing API
 * /address:
 *   get:
 *     summary: Lists all the addresses
 *     tags: [Address]
 *     responses:
 *       200:
 *         description: The list of the addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *   post:
 *     summary: Create a new address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: The created address.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       500:
 *         description: Some server error
 * /address/{id}:
 *   get:
 *     summary: Get the address by id
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *     responses:
 *       200:
 *         description: The address response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: The address was not found
 *   patch:
 *    summary: Update the address by the id
 *    tags: [Address]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The address id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Address'
 *    responses:
 *      200:
 *        description: The address was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Address'
 *      404:
 *        description: The address was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the address by id
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *
 *     responses:
 *       200:
 *         description: The address was deleted
 *       404:
 *         description: The address was not found
 */


import express from 'express';

import UserService from '../services/user.service.js';
// import { updateUserSchema, createUserSchema, getUserSchema } from '../schemas/address.schema.js';

const router = express.Router();
const service = new UserService();



router.get('/', 
  async (req, res, next) => {
  try {
    const user = await service.find();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
//   validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
//   validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
//   validatorHandler(getUserSchema, 'params'),
//   validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// router.delete('/:id',
//   passport.authenticate('jwt', { session: false }),
//   validatorHandler(getUserSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       await service.delete(id);
//       res.status(201).json({id});
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.patch('/logic-delete/:id',
// //   validatorHandler(getUserSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       await service.update(id, { active: 'inactive' });
//       res.status(201).json({id});
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default router;