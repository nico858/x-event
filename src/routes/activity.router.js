/**
 * @swagger
 * components:
 *  schemas:
 *   Activity:
 *    type: object
 *    required:
 *      - eventId
 *      - creatorId
 *      - description
 *      - cost
 *      - state
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the user.
 *      eventId:
 *        type: integer
 *        description: Id of the event to which it belongs.
 *      creatorId:
 *        type: string
 *        description: Id of the activity creator.
 *      description:
 *        type: string
 *        description: Activity description.
 *      cost:
 *        type: double
 *        description: Activity cost.
 *      state:
 *        type: string
 *        description: Activity state.
*/
/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: The activities managing API
 * /activity:
 *   get:
 *     summary: Lists all the users
 *     tags: [Activity]
 *     responses:
 *       200:
 *         description: The list of the activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *   post:
 *     summary: Create a new Activity
 *     tags: [Activity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: The created Activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Some server error
 * /activity/{id}:
 *   get:
 *     summary: Get the Activity by id
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Activity id
 *     responses:
 *       200:
 *         description: The Activity response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: The Activity was not found
 *   patch:
 *    summary: Update the Activity by the id
 *    tags: [Activity]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Activity id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Activity'
 *    responses:
 *      200:
 *        description: The Activity was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Activity'
 *      404:
 *        description: The Activity was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the Activity by id
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Activity id
 *
 *     responses:
 *       200:
 *         description: The Activity was deleted
 *       404:
 *         description: The Activity was not found
 * /activity/logic-delete/{id}:  
 *   patch:
 *     summary: Deactivate Activity by id
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Activity id
 *     responses:
 *       200:
 *         description: The Activity was disabled
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 */


import express from 'express';

import ActivityService from '../services/activity.service.js';
import validatorHandler from '../middlewares/validator.hanlder.js';
import { updateActivitySchema, createActivitySchema, getActivitySchema } from '../schemas/activity.schema.js';

const router = express.Router();
const service = new ActivityService();



router.get('/', 
  async (req, res, next) => {
  try {
    const activity = await service.find();
    res.json(activity);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getActivitySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const activity = await service.findOne(id);
      res.json(activity);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createActivitySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newActivity = await service.create(body);
      res.status(201).json(newActivity);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getActivitySchema, 'params'),
  validatorHandler(updateActivitySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const activity = await service.update(id, body);
      res.json(activity);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
//   passport.authenticate('jwt', { session: false }),
  validatorHandler(getActivitySchema, 'params'),
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
  validatorHandler(getActivitySchema, 'params'),
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