const express = require('express');
const router = express.Router();
const {
    getPetVaccinations,
    getUpcomingVaccinations,
    createVaccination,
    updateVaccination,
    deleteVaccination
} = require('../controllers/vaccinationController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

router.get('/upcoming', getUpcomingVaccinations);
router.get('/pet/:petId', getPetVaccinations);

router.post('/', createVaccination);

router.route('/:id')
    .put(updateVaccination)
    .delete(deleteVaccination);

module.exports = router;
