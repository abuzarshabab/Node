
const Joi = require('Joi');
const _ = require('lodash');

const { User } = require('../models/User');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    // Insecure
    req.body.email = "abuzarshabab7@gmail.com";
    req.body.password = "abc@123z";

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken()

    res.send(token);
});

function validateUser(user) {
    const validationLogic = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5)

    };
    return Joi.validate(user, validationLogic);
}
module.exports = router;