import mongoose from 'mongoose';
import Question from './question';

export async function db(): Promise<any> {
    console.log('db code is running now');

    await mongoose.connect(
        'mongodb+srv://jayinnejal:gfRbC6H7C4hqycn4@cluster0.wv2fzug.mongodb.net/AK_DB/?retryWrites=true&w=majority'
    );

    // Create a new question post
    const question = new Question({
        id: '123abc',
        author: 'Jayin',
        question: 'How to earn money quick?',
        status: 1,
        solution: 'Stock trading',
    });

    // Insert the article in MongoDB database
    await question.save();

    // Find a single blog post
    const firstQuestion = Question.findOne({});
    console.log(firstQuestion);
}
