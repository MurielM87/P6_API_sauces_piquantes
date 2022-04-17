const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//publier - creer un nouveau objet
router.post('/', auth, multer, saucesCtrl.createSauces);
//modifier l'objet
router.put('/:id', auth, multer, saucesCtrl.modifySauces);
//supprimer l'objet
router.delete('/:id', auth, multer, saucesCtrl.deleteSauces);
//obtenir-selectionner un objet
router.get('/:id', auth, saucesCtrl.getOneSauces);
//obtenir-selectionner tous les objets
router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;
