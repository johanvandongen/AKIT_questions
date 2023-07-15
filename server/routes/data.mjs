import express from 'express';
import db from '../db/conn.mjs';
import questionSchema from '../schema/questionSchema.mjs';
import fs from 'fs';
import json2csv from 'json2csv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const router = express.Router();

const fileName = 'AKIT_questions.csv'
const filePath = path.join(__dirname, "../exports", fileName);

const raw = (data) => {
    const fields = [{label: 'id', value: '_id'}, 'author','question', 'date', 'issue', 'exerciseIds', 'screenshot', 'chapter', 'treated.state', 'treated.remark', 'answer', 'authorReply'];
    return {data, fields}
}

// Get a list of questions
router.get('/unified', questionSchema, async (req, res) => {
    let collection = await db.collection('Authoring_Questions');
    let result = await collection.find({}).toArray();
    let csv
    const {data, fields} = raw(result);
    
    try {
        console.log('start parseing')
        csv = json2csv.parse(data, {fields});
    } catch (err) {
        return res.status(500).json({err});
    }

    console.log('csv: ', csv)
    fs.writeFile(filePath, csv, function (err) {
        console.log('here')
        if (err) {
            console.log('err')
            return res.json(err).status(500);
        }
        else {
            console.log('download')
            res.download(filePath, (err) => {
                console.log('error', err)
                fs.unlink(filePath, function (err) { // delete this file after download
                    if (err) {
                        console.error(err);
                    }
                    console.log('File has been Deleted');
                });
            });
        }
    })
})
  

export default router;