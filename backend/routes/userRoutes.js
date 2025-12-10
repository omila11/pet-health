const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// @desc    Get user profile
// @route   GET /api/users/profile
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
router.put('/profile', async (req, res) => {
    try {
        const { fullName, mobileNumber, profileImage } = req.body;
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { fullName, mobileNumber, profileImage },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            data: { user }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;
