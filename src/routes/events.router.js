import express from 'express';
import router from express.Router();
import { EventModel } from '../../db/models/event.model';

// missing middleware for auth
router.post('/', async (req, res) => {
    const { name, description, photo, cost, } = req.body;

    if (!name || !description || !photo || !cost) {
        // to check if some field are empty
        const missingField =  !name ? 'name' :
                              !description ? 'description' :
                              !photo ? 'photo' :
                              !cost ? 'cost' : 
        res.status(400).json({ message: `The field ${missingField} is missing` });
    } 

    try {
        const event = await EventModel.create({
            name,
            description,
            photo,
            cost,
        });

        res.status(201).json({ message: 'Event created!', event });
    } catch (error) {
        res.status(500).json({ message: 'Error, event not created', error });
    }
});

export default router;  // export router for use in index.js