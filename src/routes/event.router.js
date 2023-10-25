/**
 * @swagger
 * components:
 *  schemas:
 *   Event:
 *    type: object
 *    required:
 *      - creator
 *      - name
 *      - description
 *      - type
 *      - photo
 *      - cost
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the event.
 *      creator:
 *        type: integer
 *        description: Id of the creator to which it belongs.
 *      name:
 *        type: string
 *        description: Name of the event.
 *      description:
 *        type: string
 *        description: Event description.
 *      type:
 *        type: string
 *        desciprtion: Event type.
 *      photo:
 *        type: string
 *        description: Event photo.
 *      cost:
 *        type: double
 *        description: Event cost.
*/
/**
 * @swagger
 * tags:
 *   name: Event
 *   description: The events managing API
 * /event:
 *   get:
 *     summary: Lists all the events
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: The list of the events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *   post:
 *     summary: Create a new Event
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: The created Event.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       500:
 *         description: Some server error
 * /event/{id}:
 *   get:
 *     summary: Get the Event by id
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Event id
 *     responses:
 *       200:
 *         description: The Event response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: The Event was not found
 *   patch:
 *    summary: Update the Event by the id
 *    tags: [Event]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Event id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Event'
 *    responses:
 *      200:
 *        description: The Event was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Event'
 *      404:
 *        description: The Event was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the Event by id
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Event id
 *
 *     responses:
 *       200:
 *         description: The Event was deleted
 *       404:
 *         description: The Event was not found
 * /event/logic-delete/{id}:  
 *   patch:
 *     summary: Deactivate Event by id
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Event id
 *     responses:
 *       200:
 *         description: The Event was disabled
 *       404:
 *         description: The event was not found
 *       500:
 *         description: Some error happened
 */


import express from 'express';

import EventService from '../services/event.service.js';
import validatorHandler from '../middlewares/validator.hanlder.js';
import { updateEventSchema, createEventSchema, getEventSchema } from '../schemas/event.schema.js';

const router = express.Router();
const service = new EventService();



router.get('/', 
  async (req, res, next) => {
  try {
    const event = await service.find();
    res.json(event);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getEventSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await service.findOne(id);
      res.json(event);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createEventSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newEvent = await service.create(body);
      res.status(201).json(newEvent);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getEventSchema, 'params'),
  validatorHandler(updateEventSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const event = await service.update(id, body);
      res.json(event);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
//   passport.authenticate('jwt', { session: false }),
  validatorHandler(getEventSchema, 'params'),
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
  validatorHandler(getEventSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.update(id, { active: 'inactive' });
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

export default router;