import express from 'express';
import db from '../db/conn.mjs';
import questionSchema from '../schema/questionSchema.mjs';
import fs from 'fs';
import json2csv from 'json2csv';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const router = express.Router();

const fileName = 'AKIT_questions.csv'
const filePath = path.join(__dirname, "../exports", fileName);

/** Export database unified (1 mongo document per row in csv). */
router.get('/unified', questionSchema, async (req, res) => {
    let collection = await db.collection('Authoring_Questions');
    let result = await collection.find({}).toArray();
    let csv
    const fields = [{label: 'id', value: '_id'}, 'author','question', 'date', 'issue', 'exerciseIds', 'screenshot', 'chapter', 'treated.state', 'treated.remark', 'answer', 'authorReply'];
    
    try {
        console.log('start parsing')
        csv = json2csv.parse(result, {fields});
    } catch (err) {
        return res.status(500).json({err});
    }

    fs.writeFile(filePath, csv, function (err) {
        if (err) {
            console.log('err')
            return res.json(err).status(500);
        }
        else {
            console.log('Start download')
            res.download(filePath, (err) => {
                console.log('error', err)
                fs.unlink(filePath, function (err) { // delete this file after download
                    if (err) {
                        console.error(err);
                    }
                    console.log(`File ${filePath} has been Deleted`);
                });
            });
        }
    })
})

/** Export the databae in multiple csv's in a relational database format to avoid array values for certain fields. */
router.get('/split', questionSchema, async (req, res) => {
    let collection = await db.collection('Authoring_Questions');
    let result = await collection.find({}).toArray();
    const archive = archiver('zip')

    archive.on('error', (error) => {
        res.status(500).send({error: err.message})
    })

    archive.on('end', () => {
        console.log('Archive wrote %d bytes', archive.pointer())
    })

    let csvQuestions;
    let csvExerciseIds;
    let csvAnswers;
    let csvAuthorReply;
    let csvImages;
    try {
        csvQuestions = createQuestionsCSV(result)
        csvExerciseIds = createExerciseIdsCSV(result)
        csvAnswers = createAnswersCSV(result);
        csvAuthorReply = createAuthorReplyCSV(result);
        csvImages = createImagesCSV(result);
    } catch (err) {
        console.log(err)
        return res.status(500).json({err});
    }

    const promises = [
        createCSV(path.join(__dirname, "../exports", 'questions.csv'), csvQuestions), 
        createCSV(path.join(__dirname, "../exports", 'exerciseIds.csv'), csvExerciseIds),
        createCSV(path.join(__dirname, "../exports", 'answers.csv'), csvAnswers),
        createCSV(path.join(__dirname, "../exports", 'authorReply.csv'), csvAuthorReply),
        createCSV(path.join(__dirname, "../exports", 'images.csv'), csvImages)
    ]

    Promise.all(promises).then((result) => {
        console.log('results', result)
        res.attachment('AKIT_zip.zip')
        archive.pipe(res)

        for(const i in result) {
            archive.file(result[i], { name: path.basename(result[i]) });
        }

        archive.finalize().then((response) => {
            console.log('archive finalize response', response)
            // Delete this files after download
            for(const i in result) {
                fs.unlink(result[i], function (err) { 
                    if (err) {
                        console.error(err);
                    }
                    console.log(`File ${result[i]} has been Deleted`);
                });
            }
        })    
    }).catch((err) => {
        return res.json(err).status(500);
    })
})

const createCSV = (filePath, csv) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, csv, function (err) {
            if (err) {
                return reject(err)
            } else {
                return resolve(filePath)
            }
        })
    })
}

const createQuestionsCSV = (data) => {
    const fields = [{label: 'id', value: '_id'}, 'author','question', 'date', 'issue', 'chapter', 'treated.state', 'treated.remark'];
    return json2csv.parse(data, {fields}); 
}

const createExerciseIdsCSV = (data) => {
    const fields = [ 'id', 'exerciseId'];
    const exerciseIdsTable = data.flatMap((question) => (question.exerciseIds.map((exId) => (
        {'id': question._id, 
        'exerciseId': exId}
        ))))
    return json2csv.parse(exerciseIdsTable, {fields});
}

const createAnswersCSV = (data) => {
    const fields = [ 'id', 'answer', 'author', 'date'];
    const answersTable = data.flatMap((question) => (question.answer.map((answer) => (
        {'id': question._id, 
        'answer': answer.answer,
        'author': answer.author,
        'date': answer.date,
    })
        )))

    return json2csv.parse(answersTable, {fields});
}

const createAuthorReplyCSV = (data) => {
    const fields = [ 'id', 'answer', 'author', 'date'];
    const authorReplyTable = data.flatMap((question) => (question.authorReply.map((answer) => (
        {'id': question._id, 
        'answer': answer.answer,
        'author': answer.author,
        'date': answer.date,
    })
        )))

    return json2csv.parse(authorReplyTable, {fields});
}

const createImagesCSV = (data) => {
    const fields = [ 'id', 'imageUrl'];
    const imagesTable = data.flatMap((question) => (question.screenshot.map((ss) => (
        {'id': question._id, 
        'imageUrl': ss,
    })
        )))

    return json2csv.parse(imagesTable, {fields});
}
  

export default router;