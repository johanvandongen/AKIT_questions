import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import questionSchema from '../schema/questionSchema.mjs';
import multer from 'multer';
import fs from 'fs';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { fireStorage } from '../db/firebase.mjs';

const baseURL = process.env.BASE_URL;
const firebaseBaseURL = 'https://firebasestorage.googleapis.com'

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

const createQuestion = (body, images) => {
    const newQuestion = {
        author: body.author,
        question: body.question,
        date: new Date().toISOString(),
        issue: body.issue,
        exerciseIds: body.exerciseIds === undefined ? [] : body.exerciseIds,
        screenshot: images,
        chapter: body.chapter,
        treated : {
            state: body.treated.state,
            remark: body.treated.remark
        },
        answer: body.answer === undefined ? [] : body.answer.map((answer) => ({
            date: new Date().toISOString(),
            author: answer.author,
            answer: answer.answer
        })),
        authorReply: body.authorReply === undefined ? [] : body.authorReply.map((answer) => ({
            date: new Date().toISOString(),
            author: answer.author,
            answer: answer.answer
        })),
    };
    console.log('router post new question: \n', newQuestion);
    return newQuestion
}

const insertQuestion = async (newQuestion) => {
    let collection = await db.collection('Authoring_Questions');

    let result = await collection.insertOne(newQuestion).then((result) => {
        return result;
    }).catch((err) => {
        console.log('Error', err);
        // Should also delete images that just got stored
        deleteImages(newQuestion.screenshot)
        return 'Question not inserted since the question already existed';
    });
    return result;
}

const deleteImages = (images) => {
    for (const image of images) {
        if (image.slice(0, baseURL.length) === baseURL) {
            // Image stored locally on server so unlink it
            console.log('Removed the following image: ', image)
            fs.unlink(image.slice(baseURL.length, image.length), (err) => {
                if (err) {
                    console.log(err);
                    // return res.status(500).json({ errors: 'Something went wrong when deleting the associated images' })
                }
            })
        } else if (image.slice(0, firebaseBaseURL.length) === firebaseBaseURL) {
            // Image stored in firebase so delete it there
            const storageRef = ref(fireStorage, image)
            deleteObject(storageRef).then(() => {
                console.log('file succesfully deleted')
            }).catch((error) => {
                console.log(`Couldnt delete file ${image}`, error)
            })
        }
    }
}

// Create new record, where the images are stored locally on the server
router.post('/local', upload.array('screenshot', 3), questionSchema, async (req, res) => {
    console.log('file', req.files)

    let images = [];
    if (req.files !== undefined) {
        images = req.files.map((file) => baseURL + file.path)
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        deleteImages(images)
        return res.status(400).json({ errors: errors.array() })
    }

    const newQuestion = createQuestion(req.body, images)
    let result = await insertQuestion(newQuestion);

    res.send(result).status(204);
})

// Create new record, where the images are stored in firebase
const uploadFirebase = multer({ storage: multer.memoryStorage(), limits: {fileSize: 1024 * 1024 * 2}, fileFilter: fileFilter })
router.post('/', uploadFirebase.array('screenshot', 3), questionSchema, async (req, res) => {
    console.log('file', req.files)
    let images = [];
    for (const image of req.files) {
        const metatype = { contentType: image.mimetype, name: image.originalname };
        const snap = await uploadBytesResumable(ref(fireStorage, 'images/' + new Date().toISOString().replace(/:/g, '-') + image.originalname), image.buffer, metatype)
        const downloadURL = await getDownloadURL(snap.ref);
        images.push(downloadURL)
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        deleteImages(images)
        return res.status(400).json({ errors: errors.array() })
    }

    const newQuestion = createQuestion(req.body, images)
    let result = await insertQuestion(newQuestion);

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
    deleteImages(images);
    // for (const image of images) {

    //     if (image.slice(0, baseURL.length) === baseURL) {
    //         // Image stored locally on server so unlink it
    //         console.log('Removed the following image: ', image)
    //         fs.unlink(image.slice(baseURL.length, image.length), (err) => {
    //             if (err) {
    //                 console.log(err);
    //                 // return res.status(500).json({ errors: 'Something went wrong when deleting the associated images' })
    //             }
    //         })
    //     } else if (image.slice(0, firebaseBaseURL.length) === firebaseBaseURL) {
    //         // Image stored in firebase so delete it there
    //         const storageRef = ref(fireStorage, image)
    //         deleteObject(storageRef).then(() => {
    //             console.log('file succesfully deleted')
    //         }).catch((error) => {
    //             console.log(`Couldnt delete file ${image}`, error)
    //         })
    //     }
    // }

    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
  });

// This section will help you update a record by id.
router.patch("/answer/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    console.log(req.body);
    
    const updates =  {
      $set: {
        treated: {
            state: 'Yes'
        }
      },
      $push: {
        answer: {
            date: new Date().toISOString(),
            author: req.body.author,
            answer: req.body.answer
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
        $push: {
          authorReply: {
              date: new Date().toISOString(),
              author: req.body.author,
              answer: req.body.answer
          }
        }
    };
  
    let collection = await db.collection("Authoring_Questions");
    let result = await collection.updateOne(query, updates);
  
    res.send(result).status(200);
  });
  

export default router;