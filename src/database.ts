import mongoose from 'mongoose';

async function runDB() {
    await mongoose.connect('mongodb://localhost/typescript-auth', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    console.log('DB Connected!');
};

runDB().catch(e => console.log(e));