const mongoose = require("mongoose");
const movies = new mongoose.Schema({
    name: { type: String },
    genre: [{type:String}],
    description: { type: String },
    image: { type: String },
    releaseYear:{type:Number},
    rate: { type: Number }
},{ timestamps: true });
module.exports = mongoose.model("movies",movies);