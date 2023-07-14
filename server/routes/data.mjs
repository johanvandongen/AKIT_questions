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

const filePath = path.join(__dirname, "./", "csv-" + 'test' + ".csv");

// Get a list of questions
router.get('/', questionSchema, async (req, res) => {
    let collection = await db.collection('Authoring_Questions');
    let result = await collection.find({}).toArray();
    let csv

    const fields = ['author','question'];
    try {
        console.log('start parseing')
        csv = json2csv.parse(result, {fields});
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
            setTimeout(function () {
                fs.unlink(filePath, function (err) { // delete this file after 30 seconds
                if (err) {
                    console.error(err);
                }
                console.log('File has been Deleted');
            });

        }, 10000);
            res.download(filePath, (err) => {
                console.log('error', err)
            });
        }
    })

    // console.log(result);
    // res.send(result).status(200);
})
  

export default router;