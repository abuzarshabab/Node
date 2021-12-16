const mongoose = require('mongoose');

const CSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
    },
    category: {
        type: String,
        required: true,
        lowerCase: true,
        enum: ['web', 'mobile', 'network'],

    },
    author: String,
    tags: {
        type: Array,
        isAsync: true,
        validator: function (v, callback) {
            setTimeout(() => {
                // Do some async work
                const result = v && v.maxLength > 0;
                callback(result);
            }, 3000)
        },
        message: 'A course should have at least one tag'

    },
    date: { type: Date, default: Date.now },
    price: {
        type: Number,
        set: v => Math.round(v),
        // get: v => Math.round(v),
        required: function () { return this.isPublished }
    }

});

module.exports = mongoose.model("courseSchema", CSchema);