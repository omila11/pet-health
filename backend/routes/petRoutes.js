const express = require('express');
const router = express.Router();
const {
    getAllPets,
    getPet,
    createPet,
    updatePet,
    deletePet
} = require('../controllers/petController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

router.route('/')
    .get(getAllPets)
    .post(createPet);

router.route('/:id')
    .get(getPet)
    .put(updatePet)
    .delete(deletePet);

module.exports = router;
