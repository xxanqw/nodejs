const express = require('express');
require('../db/mongoose');
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});

module.exports = app;
