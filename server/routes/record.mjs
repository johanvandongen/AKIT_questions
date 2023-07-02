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

    console.log('router post new question: \n', newQuestion);

    let collection = await db.collection('Authoring_Questions');

    let result = await collection.insertOne(newQuestion).then((result) => {
        return result;
    }).catch((err) => {
        console.log('Error', err);
        return 'Question not inserted since the question already existed';
    });

    res.send(result).status(204);
})

// Get a list of questions
router.get('/', questionSchema, async (req, res) => {
    let collection = await db.collection('Authoring_Questions');
    let result = await collection.find({}).toArray();
    res.send(result).status(200);
})

export default router;