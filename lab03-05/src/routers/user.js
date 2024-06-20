const express = require('express');
const auth = require('../middleware/auth');

const {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    loginUser,
    authenticate,
    logout,
    logoutAll
} = require('../../controllers/user-controller');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/me', auth, authenticate);
router.get('/users/:id', getUser);
router.post('/users', addUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', updateUser);
router.post('/users/login', loginUser);
router.post('/users/logout', auth, logout);
router.post('/users/logoutAll', auth, logoutAll);

module.exports = router;
