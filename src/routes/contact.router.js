/**
 * @swagger
 * components:
 *  schemas:
 *   Contact:
 *    type: object
 *    required:
 *      - contact
 *      - email
 *      - state
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the Contact
 *      contact:
 *        type: integer
 *        description: Id of the contact to which its related.
 *      email:
 *        type: string
 *        description: Contact email.
 *      state:
 *        type: string
 *        description: Contact's state.
*/
/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: The Contacts managing API
 * /contact:
 *   get:
 *     summary: Lists all the Contacts
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: The list of the Contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *   post:
 *     summary: Create a new Contact
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: The created Contact.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Some server error
 * /contact/{id}:
 *   get:
 *     summary: Get the Contact by id
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Contact id
 *     responses:
 *       200:
 *         description: The Contact response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: The Contact was not found
 *   patch:
 *    summary: Update the Contact by the id
 *    tags: [Contact]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Contact id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Contact'
 *    responses:
 *      200:
 *        description: The Contact was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Contact'
 *      404:
 *        description: The Contact was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the Contact by id
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Contact id
 *
 *     responses:
 *       200:
 *         description: The Contact was deleted
 *       404:
 *         description: The Contact was not found
 */


import express from 'express';

import ContactService from '../services/contact.service.js';
import validatorHandler from '../middlewares/validator.hanlder.js';
import { updateContactSchema, createContactSchema, getContactSchema } from '../schemas/contact.schema.js';

const router = express.Router();
const service = new ContactService();



router.get('/', 
  async (req, res, next) => {
  try {
    const contacts = await service.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getContactSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const contact = await service.findOne(id);
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createContactSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newContact = await service.create(body);
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getContactSchema, 'params'),
  validatorHandler(updateContactSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const contact = await service.update(id, body);
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  // passport.authenticate('jwt', { session: false }),
  validatorHandler(getContactSchema, 'params'),
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