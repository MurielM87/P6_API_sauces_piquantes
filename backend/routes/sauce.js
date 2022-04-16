const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//publier - creer un nouveau objet
router.post('/', auth, multer, sauceCtrl.createSauce);
//modifier l'objet
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//supprimer l'objet
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);
//obtenir-selectionner un objet
router.get('/:id', auth, sauceCtrl.getOneSauce);
//obtenir-selectionner tous les objets
router.get('/', auth, sauceCtrl.getAllSauce);

module.exports = router;
