const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({message: 'Votre requête abien été reçue.'});
});

module.exports = app;