const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserScheme = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserScheme.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserScheme);