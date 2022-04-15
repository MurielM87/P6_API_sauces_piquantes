const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//publier - creer un nouveau objet
router.post('/', auth, multer, stuffCtrl.createSauce);
//modifier l'objet
router.put('/:id', auth, multer, stuffCtrl.modifySauce);
//supprimer l'objet
router.delete('/:id', auth, multer, stuffCtrl.deleteSauce);
//obtenir-selectionner un objet
router.get('/:id', auth, stuffCtrl.getOneSauce);
//obtenir-selectionner tous les objets
router.get('/', auth, stuffCtrl.getAllSauce);

module.exports = router;
