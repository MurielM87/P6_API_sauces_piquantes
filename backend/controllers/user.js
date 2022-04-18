const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//SIGN UP
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

//LOG IN
exports.login = (req, res, next) => {
    ////console.log("login")
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            //console.log("user not found")
            return res.status(401).json({error : 'utilisateur inconnu'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    //console.log("password invalid")
                    return res.status(401).json({error : 'mot de passe incorrect'});
                } 
                //console.log("password correct")
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        {userId: user._id}, 
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};
