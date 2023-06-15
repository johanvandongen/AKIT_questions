import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose.connect(
    'mongodb+srv://jayinnejal:gfRbC6H7C4hqycn4@cluster0.wv2fzug.mongodb.net/AK_DB/?retryWrites=true&w=majority'
);
