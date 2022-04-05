const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

//le serveur ecoute les requetes envoyees
server.listen(process.env.PORT || 3000); //port 3000 par defaut