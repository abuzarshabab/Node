const _ = require('lodash');
const auth = require('../middleware/auth')
const { User, validate } = require('../models/User');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const generateHashed = require('../hash');


router.get('/me', async (req, res) => {
    // const resInfo = await User.findById(req.user._id).select('-password');
    // res.send(resInfo);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered.')

    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    user.password = await generateHashed(user.password);


    await user.save();

    let token = user.generateAuthToken()
    resObject = _.pick(user, ['_id', 'name', 'email']);

    res.header('x-auth-token', token).send(resObject);
});

module.exports = router;