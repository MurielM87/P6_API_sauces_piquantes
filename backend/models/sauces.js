const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},//identifiant MongoDB de l'utilisateur
    name: {type: String, required: true},//nom de la sauce
    manufacturer: {type: String, required: true},//fabricant de la sauce
    description: {type: String, required: true},//description
    mainPepper: {type: String, required: true}, //principal ingredient epice de la sauce
    imageUrl: {type: String, required: true},//url de l'image telecharge par l'utilisateur
    heat: {type: Number, required: true},//nombre entre 1 et 10 decrivant la sauce
    likes: {type: Number, default: 0}, //likeSauces - nombre d'utilisateurs qui aiment
    dislikes: {type: Number, default: 0}, //dislike Sauces - nombre d'utilisateurs qui n'aiment pas
    usersLiked: {type: [String]},// tableau des identifiants des utilisateurs qui aiment
    usersDisliked: {type: [String]},//tableau des identifiants des utilisateurs qui n'aiment pas
});

module.exports = mongoose.model('sauce', sauceSchema);
