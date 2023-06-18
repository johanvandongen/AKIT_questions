import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Create new record
router.post('/', async (req, res) => {
    let newDocument = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    console.log('router post', newDocument);
    let collection = await db.collection('records');
    console.log('collection', collection);
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
})

export default router;