const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://MurielM87:<password>@cluster0.2q0qu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post((req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message : "objet créé"
    });
});

app.get('/api/hot-takes', (req, res, next) => {
    const sauces = [
    {
        _id: '',
        title: '',
        description: '',
        imageURL: '',
        userId: '',
    },
    {
        _id: '',
        title: '',
        description: '',
        imageURL: '',
        userId: '',
    },
    {
        _id: '',
        title: '',
        description: '',
        imageURL: '',
        userId: '',
    },
];
res.status(200).json(sauces);
});

module.exports = app;