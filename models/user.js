const mongoose = require("mongoose");
const users = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }] 
}, { timestamps: true });
module.exports = mongoose.model("users", users);