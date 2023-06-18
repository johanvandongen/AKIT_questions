import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const questionSchema = new Schema({
    id: String,
    author: String,
    question: String,
    status: Number,
    solution: String,
});

const Question = model('Question', questionSchema);
export default Question;
