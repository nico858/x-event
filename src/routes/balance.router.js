/**
 * @swagger
 * components:
 *  schemas:
 *   Balance:
 *    type: object
 *    required:
 *      - eventId
 *      - participantId
 *      - balance
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the Balance
 *      eventId:
 *        type: integer
 *        description: Id of the event to which its realted .
 *      partipantId:
 *        type: integer
 *        description: Id of the participant to which its related.
 *      balance:
 *        type: double
 *        description: Balance. Cost per participant for an event.
*/
/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: The Balances managing API
 * /balance:
 *   get:
 *     summary: Lists all the Balances
 *     tags: [Balance]
 *     responses:
 *       200:
 *         description: The list of the Balances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Balance'
 *   post:
 *     summary: Create a new Balance
 *     tags: [Balance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Balance'
 *     responses:
 *       200:
 *         description: The created Balance.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Balance'
 *       500:
 *         description: Some server error
 * /balance/{id}:
 *   get:
 *     summary: Get the Balance by id
 *     tags: [Balance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Balance id
 *     responses:
 *       200:
 *         description: The Balance response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Balance'
 *       404:
 *         description: The Balance was not found
 *   patch:
 *    summary: Update the Balance by the id
 *    tags: [Balance]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Balance id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Balance'
 *    responses:
 *      200:
 *        description: The Balance was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Balance'
 *      404:
 *        description: The Balance was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the Balance by id
 *     tags: [Balance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Balance id
 *
 *     responses:
 *       200:
 *         description: The Balance was deleted
 *       404:
 *         description: The Balance was not found
 */


import express from 'express';

import BalanceService from '../services/balance.service.js';
import validatorHandler from '../middlewares/validator.hanlder.js';
import { updateBalanceSchema, createBalanceSchema, getBalanceSchema } from '../schemas/balance.schema.js';

const router = express.Router();
const service = new BalanceService();



router.get('/', 
  async (req, res, next) => {
  try {
    const balance = await service.find();
    res.json(balance);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getBalanceSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const balance = await service.findOne(id);
      res.json(balance);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createBalanceSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBalance = await service.create(body);
      res.status(201).json(newBalance);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getBalanceSchema, 'params'),
  validatorHandler(updateBalanceSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const balance = await service.update(id, body);
      res.json(balance);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  // passport.authenticate('jwt', { session: false }),
  validatorHandler(getBalanceSchema, 'params'),
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

export default router;