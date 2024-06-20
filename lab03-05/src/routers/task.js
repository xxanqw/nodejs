const express = require('express');
const auth = require('../middleware/auth');

const {
    getTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask,
} = require('../../controllers/task-controller');

const router = express.Router();

router.get('/tasks', auth, getTasks);
router.get('/tasks/:id', auth, getTask);
router.post('/tasks', auth, addTask);
router.delete('/tasks/:id', auth, deleteTask);
router.patch('/tasks/:id', auth, updateTask);

module.exports = router;
