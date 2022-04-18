const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

mongoose.connect(`mongodb+srv://MurielM87:StigDagerman27@cluster0.xk47l.mongodb.net/api_sauces_piquantes?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json());

app.use((req, res, next) => {
  //tout le monde peut acceder a l'API
  res.setHeader('Access-Control-Allow-Origin', '*');
  //les entetes acceptes
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //les methodes acceptees
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //les scripts acceptes
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

app.use(bodyParser.json());

app.use(cors()); //donne l'accès de l'API a tout le monde
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;
