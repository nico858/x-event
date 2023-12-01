/**
 * @swagger
 * components:
 *  schemas:
 *   Participant:
 *    type: object
 *    required:
 *      - eventId
 *      - state
 *      - cost
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the Participant
 *      eventId:
 *        type: integer
 *        description: Id of the event to which its related.
 *      state:
 *        type: string
 *        description: Participant's state
 *      cost:
 *        type: string
 *        description: Amount that need to be paid for the participant.
*/
/**
 * @swagger
 * tags:
 *   name: Participant
 *   description: The Participants managing API
 * /participant:
 *   get:
 *     summary: Lists all the Participants
 *     tags: [Participant]
 *     responses:
 *       200:
 *         description: The list of the Participants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Participant'
 *   post:
 *     summary: Create a new Participant
 *     tags: [Participant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Participant'
 *     responses:
 *       200:
 *         description: The created Participant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participant'
 *       500:
 *         description: Some server error
 * /participant/{id}:
 *   get:
 *     summary: Get the Participant by id
 *     tags: [Participant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Participant id
 *     responses:
 *       200:
 *         description: The Participant response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participant'
 *       404:
 *         description: The Participant was not found
 *   patch:
 *    summary: Update the Participant by the id
 *    tags: [Participant]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Participant id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Participant'
 *    responses:
 *      200:
 *        description: The Participant was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Participant'
 *      404:
 *        description: The Participant was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the Participant by id
 *     tags: [Participant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Participant id
 *
 *     responses:
 *       200:
 *         description: The Participant was deleted
 *       404:
 *         description: The Participant was not found
 * /participant/logic-delete/{id}:  
 *   patch:
 *     summary: Deactivate Participant by id
 *     tags: [Participant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Participant id
 *     responses:
 *       200:
 *         description: The Participant was disabled
 *       404:
 *         description: The Participant was not found
 *       500:
 *         description: Some error happened
 */


import express from 'express';

import ParticipantService from '../services/participant.service.js';
import validatorHandler from '../middlewares/validator.hanlder.js';
import { updateParticipantSchema, createParticipantSchema, getParticipantSchema } from '../schemas/participant.schema.js';

const router = express.Router();
const service = new ParticipantService();



router.get('/', 
  async (req, res, next) => {
  try {
    const participant = await service.find();
    res.json(participant);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getParticipantSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const participant = await service.findOne(id);
      res.json(participant);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/byEvent/:eventId',
  async (req, res, next) => {
    try {
      const { eventId } = req.params;
      const participants = await service.findByEvent(eventId);
      res.json(participants);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createParticipantSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newParticipant = await service.create(body);
      res.status(201).json(newParticipant);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getParticipantSchema, 'params'),
  validatorHandler(updateParticipantSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const participant = await service.update(id, body);
      res.json(participant);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/acceptParticipantion/:userId/:eventId',
  async (req, res, next) => {
    try {
      const { userId, eventId } = req.params;
      const participant = await service.acceptInvitation(userId, eventId);
      res.json(participant);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  // passport.authenticate('jwt', { session: false }),
  validatorHandler(getParticipantSchema, 'params'),
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