const router = require('express').Router();
const Joi = require('joi')
const mongoose = require('mongoose')
// const customer = require()

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

router.get('/', async (req, res) => {
    const customers = await Customer.find({});
    res.send(customers);
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const error = validateCustomer(req.body)
    // console.log(error);
    // if (error) return res.status(400).send(error.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })
    customer.save().then(result => {
        console.log(result)
    })

})

function validateCustomer(cus) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(cus, schema);
}

module.exports = router;