/**
 * @swagger
 * components:
 *  schemas:
 *   Registration:
 *    type: object
 *    required:
 *      - participantId
 *      - activityId
 *      - percentage
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the Registration
 *      participantId:
 *        type: integer
 *        description: Id of the particiand to which its related.
 *      activityId:
 *        type: integer
 *        description: Id of the activity to which its related.
 *      percentage:
 *        type: double
 *        description: Percentage to be paid for the participant.
*/
/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: The Registrations managing API
 * /registration:
 *   get:
 *     summary: Lists all the Registrations
 *     tags: [Registration]
 *     responses:
 *       200:
 *         description: The list of the Registrations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Registration'
 *   post:
 *     summary: Create a new Registration
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       200:
 *         description: The created Registration.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       500:
 *         description: Some server error
 * /registration/{id}:
 *   get:
 *     summary: Get the Registration by id
 *     tags: [Registration]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Registration id
 *     responses:
 *       200:
 *         description: The Registration response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       404:
 *         description: The Registration was not found
 *   patch:
 *    summary: Update the Registration by the id
 *    tags: [Registration]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Registration id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Registration'
 *    responses:
 *      200:
 *        description: The Registration was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Registration'
 *      404:
 *        description: The Registration was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the Registration by id
 *     tags: [Registration]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Registration id
 *
 *     responses:
 *       200:
 *         description: The Registration was deleted
 *       404:
 *         description: The Registration was not found
 */


import express from 'express';

import RegistrationService from '../services/registration.service.js';
import validatorHandler from '../middlewares/validator.hanlder.js';
import { updateRegistrationSchema, createRegistrationSchema, getRegistrationSchema } from '../schemas/registration.schema.js';

const router = express.Router();
const service = new RegistrationService();



router.get('/', 
  async (req, res, next) => {
  try {
    const registration = await service.find();
    res.json(registration);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getRegistrationSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const registration = await service.findOne(id);
      res.json(registration);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/byActivity/:activityId',
  async (req, res, next) => {
    try {
      const { activityId } = req.params;
      const registrations = await service.findByActivity(activityId);
      res.json(registrations);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createRegistrationSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRegistration = await service.create(body);
      res.status(201).json(newRegistration);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getRegistrationSchema, 'params'),
  validatorHandler(updateRegistrationSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const registration = await service.update(id, body);
      res.json(registration);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  // passport.authenticate('jwt', { session: false }),
  validatorHandler(getRegistrationSchema, 'params'),
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