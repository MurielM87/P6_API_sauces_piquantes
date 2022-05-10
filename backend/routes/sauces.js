const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//publish - create a new object
router.post('/', auth, multer, saucesCtrl.createSauce);
//modify an object
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
//delete an object
router.delete('/:id', auth, multer, saucesCtrl.deleteSauce);
//get-select an object
router.get('/:id', auth, saucesCtrl.getOneSauce);
//get-select all the objects
router.get('/', auth, saucesCtrl.getAllSauces);
//likes-dislikes
router.post('/:id/like', auth, saucesCtrl.likesDislikesSauce);
router.post('/:id/dislike', auth, saucesCtrl.likesDislikesSauce);

module.exports = router;
