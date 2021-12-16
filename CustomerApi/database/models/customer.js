
const Joi = require('joi')
const mongoose = require('mongoose')

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLenght: 5,
        maxLength: 50
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        require: true,
        minLenght: 5,
        maxLength: 50
    },

}))


function validateCustomer(cus) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    }
    // return Joi.validate(cus, schema);
}
module.exports = Customer;
module.exports = validateCustomer;