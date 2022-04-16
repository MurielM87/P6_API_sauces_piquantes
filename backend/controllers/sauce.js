const sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'objet trouvé' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    //pour modifier un Sauce dans la base de donnees
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}//images/${req.file.filename}`
        } : { ...req.body };
    sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'objet modifié' }))
        .catch(error => res.status(400).json({ error }));
};

//pour supprimer un objet
exports.deleteSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl / split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'objet supprimé' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(400).json({ error }));

};

//pour apporter un objet
exports.getOneSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error })); //404 objet non trouvé
};

//pour apporter tous les objets
exports.getAllSauce = (req, res, next) => {
    sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};
