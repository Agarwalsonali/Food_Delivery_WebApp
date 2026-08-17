const mongoose = require('mongoose');   

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {    
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    }
});

export const userSchema = mongoose.models.users || mongoose.model('users', userModel);