const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please provide pet name'],
        trim: true
    },
    species: {
        type: String,
        required: [true, 'Please specify species'],
        enum: ['dog', 'cat', 'bird', 'other']
    },
    breed: {
        type: String,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please provide date of birth']
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    weight: {
        type: Number,
        min: 0
    },
    color: {
        type: String,
        trim: true
    },
    microchipNumber: {
        type: String,
        unique: true,
        sparse: true
    },
    photo: {
        type: String,
        default: null
    },
    medicalHistory: [{
        condition: String,
        diagnosedDate: Date,
        notes: String
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Virtual for age calculation
petSchema.virtual('age').get(function() {
    const ageDifMs = Date.now() - this.dateOfBirth.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

module.exports = mongoose.model('Pet', petSchema);
