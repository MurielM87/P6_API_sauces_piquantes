const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true}, //likeSauce
    dislikes: {type: Number, required: true}, //dislike Sauce
    imageUrl: {type: String, required: true},
    mainPepper: {type: String, required: true},
    usersLiked: {type: String, required: true},
    usersDisliked: {type: String, required: true},
    userId: {type: String, required: true}
});

module.expots = mongoose.model('Sauce', sauceSchema);