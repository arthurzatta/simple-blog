import mongoose from 'mongoose';
import knex from 'knex'

require('dotenv').config()

const mongoose = mongoose.connect(process.env.MONGODB_URI,{
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD,
    auth: {
        authSource: 'admin'
    },
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected')
})
.catch(error => {
    console.error(error);
});

export default mongoose;