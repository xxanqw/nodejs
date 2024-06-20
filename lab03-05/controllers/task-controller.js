const Task = require('../models/task');

const handleError = (res, error) => {
    res.send(error.message);
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id });
        res.status(200).json(tasks);
    } catch(err) {
        handleError(res, err);
    }
};
const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task.owner.toString() !== req.user._id.toString()) {
            res.status(404).json('The task does not belong to an authorised user');
        } else {
            res.status(200).json(task);
        }
    } catch(err) {
        handleError(res, err);
    }
};
const addTask = async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user.id
    });

    try {
        await task.save();
        res.status(200).json(task);
    } catch(err) {
        handleError(res, err);
    }
};
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            res.status(404).json();
        } else {
            res.status(200).json(task);
        }
    } catch(err) {
        handleError(res, err);
    }
};
const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            res.status(404).send({ error: "The task does not exist or does not belong to the current user." });
        } else {
            Object.keys(req.body).forEach(key => {
                task[key] = req.body[key];
            });
            await task.save();

            res.send(task);
        }
    } catch(err) {
        handleError(res, err);
    }
};


module.exports = {
    getTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask
};
