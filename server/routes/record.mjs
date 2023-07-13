import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import questionSchema from '../schema/questionSchema.mjs';
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
}

const upload = multer({storage: storage, limits: {fileSize: 1024 * 1024 * 2}, fileFilter: fileFilter})

const router = express.Router();

// Create new record
router.post('/', upload.array('screenshot', 3), questionSchema, async (req, res) => {
    console.log('file', req.files)

    let images = [];
    if (req.files !== undefined) {
        images = req.files.map((file) => file.path)
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const newQuestion = {
        author: req.body.author,
        question: req.body.question,
        date: new Date().toISOString(),
        issue: req.body.issue,
        exerciseIds: req.body.exerciseIds === undefined ? [] : req.body.exerciseIds,
        screenshot: images,
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

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
  
    const collection = db.collection("Authoring_Questions");

    let question = await collection.find(query).toArray();
    const images = question[0].screenshot;
    for (const image of images) {
        console.log('Removed the following image: ', image)
        fs.unlink(image, (err) => {
            if (err) {
                console.log(err);
                // return res.status(500).json({ errors: 'Something went wrong when deleting the associated images' })
            }
        })
    }

    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
  });

// This section will help you update a record by id.
router.patch("/answer/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    console.log(req.body);
    
    const updates =  {
      $set: {
        answer: req.body.answer,
        treated: {
            state: 'Yes'
        }
      }
    };
  
    let collection = await db.collection("Authoring_Questions");
    let result = await collection.updateOne(query, updates);
  
    res.send(result).status(200);
  });

  router.patch("/reply/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    console.log(req.body);
    
    const updates =  {
      $set: {
        authorReply: req.body.answer,
      }
    };
  
    let collection = await db.collection("Authoring_Questions");
    let result = await collection.updateOne(query, updates);
  
    res.send(result).status(200);
  });
  

export default router;