const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé !'})) //creation de ressource
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error})); //erreur serveur
};

exports.login = (req, res, next) => {

};
