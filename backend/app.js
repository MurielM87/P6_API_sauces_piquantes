const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const Thing = require('./models/Thing');

mongoose.connect('mongodb+srv://MurielM87:<password>@cluster0.2q0qu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('./api/hot-takes', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({message: 'objet trouvé'}))
    .catch(error => res.status(400).json({error}));
});

app.put('/api/hot-takes/:id', (req, res, next) => {
    //pour modifier un Thing dans la base de donnees
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id}) 
    .then(() => res.status(200).json({message: 'objet modifié'}))
    .catch(error => res.status(400).json({error}));
});

app.delete('/api/hot-takes/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'objet supprimé'}))
    .catch(error => res.status(400).json({error}));
});

app.get('/api/hot-takes/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error})); //404 objet non trouvé
});

app.get('/api/hot-takes', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
});

module.exports = app;