//Mongoose set up
let mongoose = require("mongoose");

//Schema set up 
let dogSchema = new mongoose.Schema ({
	name: String,
	age: Number,
	breed: String,
	personality: String,
	isTherapyDog: Boolean,
	behaviourWithStrangers: String,
	description: String,
	location: {
		type: [Number],
		index: "2dsphere",
	},
	owner: {
		ref: "owner",
		type: mongoose.Schema.ObjectId,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	url: String,
});

module.exports = mongoose.model("Dog", dogSchema);