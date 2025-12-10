const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    vaccineName: {
        type: String,
        required: [true, 'Please provide vaccine name'],
        trim: true
    },
    vaccineType: {
        type: String,
        required: true,
        enum: ['core', 'non-core', 'required', 'optional']
    },
    administeredDate: {
        type: Date,
        required: [true, 'Please provide administration date']
    },
    nextDueDate: {
        type: Date,
        required: true
    },
    veterinarian: {
        type: String,
        required: true,
        trim: true
    },
    clinic: {
        name: String,
        address: String,
        phone: String
    },
    batchNumber: {
        type: String,
        trim: true
    },
    manufacturer: {
        type: String,
        trim: true
    },
    sideEffects: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    certificate: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['completed', 'scheduled', 'overdue', 'upcoming'],
        default: 'completed'
    },
    reminderSent: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for querying by pet and date
vaccinationSchema.index({ pet: 1, nextDueDate: 1 });

module.exports = mongoose.model('Vaccination', vaccinationSchema);
