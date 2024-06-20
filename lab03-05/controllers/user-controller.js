const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleError = (res, error) => {
    res.send(error.message);
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch(err) {
        handleError(res, err);
    }
};
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        handleError(res, err);
    }
};
const addUser = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(401).send();
    }
};
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(404).json();
        } else {
            res.status(200).json(user);
        }
    } catch(err) {
        handleError(res, err);
    }
};
const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});

        if (!user) {
            res.status(404).json();
            throw new Error("User not found");
        }

        const fields = ['firstName', 'lastName', 'age', 'password'];

        fields.forEach((field) => {
            if (req.body[field]) {
                user[field] = req.body[field];
            }
        });

        await user.save();
        res.json(user);
    } catch(err) {
        handleError(res, err);
    }
};
const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send({ error: 'Incorrect email' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Incorrect password' });
        }

        const token = jwt.sign({_id: user._id.toString()}, 'kdweueksdsjfij');
        user.tokens = user.tokens.concat({ token });

        await user.save();

        res.send({user, token});
    } catch(err) {
        res.status(400).send();
    }
};
const authenticate = async (req, res) => {
    res.send(req.user);
};
const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
};

const logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();
        res.send({ message: 'Logged out all successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    loginUser,
    authenticate,
    logout,
    logoutAll
};
