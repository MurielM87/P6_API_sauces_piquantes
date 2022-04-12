const Thing = require('../models/Thing');
const fs = require('fs');

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'objet trouvé' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {
    //pour modifier un Thing dans la base de donnees
    const thingObject = req.file ?
        {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}//images/${req.file.filename}`
        } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'objet modifié' }))
        .catch(error => res.status(400).json({ error }));
};

//pour supprimer un objet
exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            const filename = thing.imageUrl / split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'objet supprimé' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(400).json({ error }));

};

//pour apporter un objet
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error })); //404 objet non trouvé
};

//pour apporter tous les objets
exports.getAllThing = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};
