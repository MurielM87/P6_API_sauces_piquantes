const Sauce = require('../models/sauces');
const fs = require('fs');
const res = require('express/lib/response');

exports.createSauce = (req, res, next) => {
    console.log("essai", req.body.sauce)
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'sauce enregistrée' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    //pour modifier un objet dans la base de donnees
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}//images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'sauce modifiée' }))
        .catch(error => res.status(400).json({ error }));
};

//pour supprimer un objet
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (!sauce) {
                return res.status(404).json({
                    error: new Error('objet non trouvé')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(400).json({
                    messsage: "accès non-autorisé !"
                });
            }
            const filename = sauce.imageUrl / split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'objet supprimé' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));

};

//pour apporter un objet
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({ error })); //404 objet non trouvé
};

//pour apporter tous les objets
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//integrer des likes et dislikes
exports.likesSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauces) => {
            //like = 1
            if (!sauces.usersLiked.includes(req.body.userId) && req.body.likes === 1) {
                console.log("succès")
                //mise à jour de l'objet BDD
                getOneSauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        $push: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce like +1" }))
                    .catch((error => res.status(400).json({ error })));
            };

            //like = 0 (retirer le like)
            if (sauces.usersLiked.includes(req.body.userId) && req.body.likes === 0) {
                //mise à jour de l'objet BDD
                getOneSauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce like 0" }))
                    .catch((error => res.status(400).json({ error })));
            };

            //like : -1 (dislike = 1)
            if (!sauces.usersDisliked.includes(req.body.userId) && req.body.dislikes === 1) {
                //mise à jour de l'objet BDD
                getOneSauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: 1 },
                        $push: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce dislike 1" }))
                    .catch((error => res.status(400).json({ error })));
            };

            //dislike = 0 (retirer le dislike)
            if (sauces.usersDisliked.includes(req.body.userId) && req.body.dislikes === 0) {
                //mise à jour de l'objet BDD
                getOneSauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce dislike 0" }))
                    .catch((error => res.status(400).json({ error })));
            };

        })
        .catch(error => res.status(404).json({ error }));
};