const Pet = require('../models/Pet');

// @desc    Get all pets for logged in user
// @route   GET /api/pets
// @access  Private
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find({ owner: req.user.id, isActive: true })
            .sort('-createdAt');

        res.status(200).json({
            status: 'success',
            results: pets.length,
            data: { pets }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Get single pet
// @route   GET /api/pets/:id
// @access  Private
exports.getPet = async (req, res) => {
    try {
        const pet = await Pet.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!pet) {
            return res.status(404).json({
                status: 'error',
                message: 'Pet not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { pet }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Create new pet
// @route   POST /api/pets
// @access  Private
exports.createPet = async (req, res) => {
    try {
        req.body.owner = req.user.id;
        const pet = await Pet.create(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Pet added successfully',
            data: { pet }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Update pet
// @route   PUT /api/pets/:id
// @access  Private
exports.updatePet = async (req, res) => {
    try {
        let pet = await Pet.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!pet) {
            return res.status(404).json({
                status: 'error',
                message: 'Pet not found'
            });
        }

        pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            message: 'Pet updated successfully',
            data: { pet }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Delete pet
// @route   DELETE /api/pets/:id
// @access  Private
exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!pet) {
            return res.status(404).json({
                status: 'error',
                message: 'Pet not found'
            });
        }

        // Soft delete
        pet.isActive = false;
        await pet.save();

        res.status(200).json({
            status: 'success',
            message: 'Pet deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
