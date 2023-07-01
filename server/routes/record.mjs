import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import questionSchema from '../schema/questionSchema.mjs';

const router = express.Router();

// Create new record
router.post('/', questionSchema, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const newQuestion = {
        author: req.body.author,
        question: req.body.question,
        date: new Date().toISOString(),
        issue: req.body.issue,
        exerciseIds: req.body.exerciseIds,
        screenshot: req.body.screenshot,
        chapter: req.body.chapter,
        treated : {
            state: req.body.treated.state,
            remark: req.body.treated.remark
        },
        answer: req.body.answer,
        authorReply: req.body.authorReply,
    };

    console.log('router post', newQuestion);

    let collection = await db.collection('Authoring_Questions');
    let result = await collection.insertOne(newQuestion);

    res.send(result).status(204);
})

export default router;