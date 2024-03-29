const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const secret = config.get('jwtPrivateKey');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1025,

    }
})

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, secret)
}

// userSchema.methods.validateUser = function (user) {
//     const validationLogic = {
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(5)

//     };
//     return Joi.validate(user, validationLogic);
// }

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(8).max(255).required(),

    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;