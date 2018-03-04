//Mongoose set up
let mongoose = require("mongoose");
let GeoJSON = require('mongoose-geojson-schema');

//Schema set up
let dogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
    personality: String,
    isTherapyDog: Boolean,
    behaviourWithStrangers: String,
    description: String,
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    location: {
        type: mongoose.Schema.Types.Point,
        coordinates: [Number],
    },
    created: {
        type: Date,
        default: Date.now,
    },
    img: String,
    url: String,
});
dogSchema.index({"location": "2dsphere"});
module.exports = mongoose.model("Dog", dogSchema);