const mongoose = require('mongoose');
const env = require('dotenv').config();

const URL = process.env.MONGODB_URL;

mongoose
    .connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));
