const mongoose = require("mongoose");
const movies = new mongoose.Schema({
    name: { type: String },
    genre: {type:String},
    description: { type: String },
    image: { type: String },
    rate: { type: Number }
});
module.exports = mongoose.model("movies",movies);