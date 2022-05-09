const res = require('express/lib/response');
const multer = require('multer');

//formats des images acceptees
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

//definition du lieu de stockage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    //definition du nom du fichier image
    filename: (req, file, callback) => {
       
        //etape 0 pour verifier si l'extension dans les extensions autorisees

        if (file.mimetype in MIME_TYPES) {
            const extension = MIME_TYPES[file.mimetype];

            //etape 1 pour retirer l'extension du nom du fichier
            let name = file.originalname.split('.');
            name = name[0];

            //etape 2 pour sanitariser le nom du fichier
            name = name.split(' ').join('_');

            console.log("mimetype ok");
            callback(null, name + Date.now() + '.' + extension);
            
        } else {
            console.log("mimetype ko")
            callback(false, '');
            return false;
        }
        
    },


});

module.exports = multer({ storage }).single('image');
