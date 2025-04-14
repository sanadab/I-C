const mongoose = require('mongoose');

const counselorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    courses: [{
        type: String
    }],
    testimonials: [{
        type: String
    }],

});

const Counselor = mongoose.model('Details', counselorSchema);

module.exports = Counselor;