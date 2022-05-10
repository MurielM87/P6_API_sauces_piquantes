const Sauce = require('../models/sauces');
const fs = require('fs');

//create an object
exports.createSauce = (req, res, next) => {
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
    //modify an object in the database
   
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'sauce modifiée' }))
        .catch(error => res.status(404).json({ error }));
};

//delete an object
exports.deleteSauce = (req, res, next) => {
    //find an object in the database
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'objet effacé de la base de données' }))
                    .catch((error) => res.status(404).json({ error }));
            })

        })
        .catch((error) => res.status(500).json({ error }));
};

//get an object
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

//get all the objects
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//integrate likes/dislikes
exports.likesDislikesSauce = (req, res, next) => {
    
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
           
            //switch case
            switch (req.body.like) {
                case 1:
                    //like = 1
                    if (!sauce.usersLiked.includes(req.body.userId)) {
                        
                        //update object BDD
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { likes: 1 },
                                $push: { usersLiked: req.body.userId }
                            }
                        )
                            .then(() => res.status(201).json({ message: "like sauce +1" }))
                            .catch((error => res.status(500).json({ error })));
                    }else{
                        return res.status(401).json({message : 'cet utilisateur a déjà liké cette sauce'});
                    }
                    break;

                case 0:
                    //like = 0 (delete the like)
                    if (sauce.usersLiked.includes(req.body.userId)) {

                        //update the object BDD
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId }
                            }
                        )
                            .then(() => res.status(201).json({ message: "annulation du like" }))
                            .catch((error => res.status(500).json({ error })));

                    }
                    //dislike = 0 (delete the dislike)
                    if (sauce.usersDisliked.includes(req.body.userId)) {
                        //update the object BDD
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId }
                            }
                        )
                            .then(() => res.status(201).json({ message: "annulation du dislike" }))
                            .catch((error => res.status(500).json({ error })));
                    }
                    break;


                case -1:
                    //like : -1 (dislike = 1)
                    if (!sauce.usersDisliked.includes(req.body.userId)) {
                        //update the object BDD
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { dislikes: 1 },
                                $push: { usersDisliked: req.body.userId }
                            }
                        )
                            .then(() => res.status(201).json({ message: "dislike de la sauce" }))
                            .catch((error => res.status(500).json({ error })));
                    };
                    break;

            }

        })
        .catch(error => {res.status(404).json({ error })
        });
};
