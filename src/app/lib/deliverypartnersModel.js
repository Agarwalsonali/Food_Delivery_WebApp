const mongoose = require('mongoose');   

const deliveryPartnersModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

export const deliveryPartnersSchema = mongoose.models.deliverypartners || mongoose.model('deliverypartners', deliveryPartnersModel);