const http = require('http');

const server = http.createServer((req, res) => {
    res.end('voila la reponse du server') //le serveur est prêt
});

//le serveur ecoute les requetes envoyees
server.listen(process.env.PORT || 3000); //port 3000 par defaut