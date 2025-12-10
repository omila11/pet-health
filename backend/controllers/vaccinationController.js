const Vaccination = require('../models/Vaccination');
const Pet = require('../models/Pet');

// @desc    Get all vaccinations for a pet
// @route   GET /api/vaccinations/pet/:petId
// @access  Private
exports.getPetVaccinations = async (req, res) => {
    try {
        // Verify pet belongs to user
        const pet = await Pet.findOne({
            _id: req.params.petId,
            owner: req.user.id
        });

        if (!pet) {
            return res.status(404).json({
                status: 'error',
                message: 'Pet not found'
            });
        }

        const vaccinations = await Vaccination.find({ pet: req.params.petId })
            .sort('-administeredDate');

        res.status(200).json({
            status: 'success',
            results: vaccinations.length,
            data: { vaccinations }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Get upcoming vaccinations
// @route   GET /api/vaccinations/upcoming
// @access  Private
exports.getUpcomingVaccinations = async (req, res) => {
    try {
        // Get all user's pets
        const pets = await Pet.find({ owner: req.user.id, isActive: true });
        const petIds = pets.map(pet => pet._id);

        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const vaccinations = await Vaccination.find({
            pet: { $in: petIds },
            nextDueDate: { $gte: today, $lte: nextMonth },
            status: { $in: ['scheduled', 'upcoming'] }
        })
        .populate('pet', 'name species')
        .sort('nextDueDate');

        res.status(200).json({
            status: 'success',
            results: vaccinations.length,
            data: { vaccinations }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Create vaccination record
// @route   POST /api/vaccinations
// @access  Private
exports.createVaccination = async (req, res) => {
    try {
        // Verify pet belongs to user
        const pet = await Pet.findOne({
            _id: req.body.pet,
            owner: req.user.id
        });

        if (!pet) {
            return res.status(404).json({
                status: 'error',
                message: 'Pet not found'
            });
        }

        const vaccination = await Vaccination.create(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Vaccination record created successfully',
            data: { vaccination }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Update vaccination record
// @route   PUT /api/vaccinations/:id
// @access  Private
exports.updateVaccination = async (req, res) => {
    try {
        let vaccination = await Vaccination.findById(req.params.id).populate('pet');

        if (!vaccination) {
            return res.status(404).json({
                status: 'error',
                message: 'Vaccination record not found'
            });
        }

        // Verify pet belongs to user
        if (vaccination.pet.owner.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'Not authorized to update this vaccination record'
            });
        }

        vaccination = await Vaccination.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: 'success',
            message: 'Vaccination record updated successfully',
            data: { vaccination }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Delete vaccination record
// @route   DELETE /api/vaccinations/:id
// @access  Private
exports.deleteVaccination = async (req, res) => {
    try {
        const vaccination = await Vaccination.findById(req.params.id).populate('pet');

        if (!vaccination) {
            return res.status(404).json({
                status: 'error',
                message: 'Vaccination record not found'
            });
        }

        // Verify pet belongs to user
        if (vaccination.pet.owner.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'Not authorized to delete this vaccination record'
            });
        }

        await vaccination.deleteOne();

        res.status(200).json({
            status: 'success',
            message: 'Vaccination record deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
