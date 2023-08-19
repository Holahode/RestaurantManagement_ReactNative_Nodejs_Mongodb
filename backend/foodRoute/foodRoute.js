const express = require('express');
const router = express.Router();
const foodControl = require('../foodControl/foodControl');

// CRUD owner
router.post('/login', foodControl.login);
router.post('/', foodControl.addOwner);
router.put('/:ownerId', foodControl.editOwner);
router.delete('/:ownerId', foodControl.deleteOwner);
router.get('/', foodControl.validateTkn, foodControl.getOwners);

// // CRUD food
router.post('/:ownersId/foods', foodControl.addFoods);
router.put('/:ownersId/foods/:foodId', foodControl.editFood);
router.delete('/:ownersId/foods/:foodId', foodControl.deleteFood);
router.get('/:ownersId', foodControl.viewAllFoods)

// // CRUD note
router.post('/:ownersId/notes', foodControl.addNotes);
router.put('/:ownersId/notes/:code', foodControl.editNote);
router.delete('/:ownersId/notes/:code', foodControl.deleteNote);
router.get('/dd/:owne', foodControl.viewAllNotes);



module.exports = router;