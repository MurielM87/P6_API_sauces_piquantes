const mongoose = require('mongoose');

const thingsSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageURL: {type: String, required: true},
    price: {type: Number, required: true},
});

module.expots = mongoose.model('Thing', thingsSchema);
