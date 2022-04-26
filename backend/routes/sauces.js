const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//publier - creer un nouveau objet
router.post('/', auth, multer, saucesCtrl.createSauce);
//modifier l'objet
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
//supprimer l'objet
router.delete('/:id', auth, multer, saucesCtrl.deleteSauce);
//obtenir-selectionner un objet
router.get('/:id', auth, saucesCtrl.getOneSauce);
//obtenir-selectionner tous les objets
router.get('/', auth, saucesCtrl.getAllSauces);
//pour les likes et dislikes
router.post('/:id/like', auth, saucesCtrl.likesDislikesSauce);
router.post('/:id/dislike', auth, saucesCtrl.likesDislikesSauce);

module.exports = router;
