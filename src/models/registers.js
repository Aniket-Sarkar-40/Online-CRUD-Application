require("dotenv").config();
const mongoose = require("mongoose");


const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Hobbies: {
        type: String,
        required: true,
    },
    
});



const Client = new mongoose.model("Client", clientSchema);

module.exports = Client;