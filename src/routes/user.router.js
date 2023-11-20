/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *      - firstName
 *      - lastName
 *      - email
 *      - password
 *      - nickName
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the user
 *      firstName:
 *        type: string
 *        description: User name.
 *      lastName:
 *        type: string
 *        description: User lastname
 *      email:
 *        type: string
 *        description: User email
 *      password:
 *        type: string
 *        description: User password
 *      nickName:
 *        type: string
 *        description: User nickname. I'll be use in the API.
 *      photo:
 *        type: string
 *        description: User photo. I'll be shown in the API.
*/
/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 * /user:
 *   get:
 *     summary: Lists all the users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /user/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *   patch:
 *    summary: Update the user by the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 * /user/logic-delete/{id}:  
 *   patch:
 *     summary: Deactivate user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was disabled
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 */


import express from 'express';

import UserService from '../services/user.service.js';
import validatorHandler from '../middlewares/validator.hanlder.js';
import { updateUserSchema, createUserSchema, getUserSchema } from '../schemas/user.schema.js';

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
  validatorHandler(getUserSchema, 'params'),
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

router.get('/byNickName/nickname',
  async (req, res, next) => {
    try {
      const { nickName } = req.body;
      const user = await service.findByNickName(nickName);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
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
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
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

router.delete('/:id',
  // passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/logic-delete/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.logicDelete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

export default router;