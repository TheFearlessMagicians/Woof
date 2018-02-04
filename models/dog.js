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
          geo:{lat:Number,lng:Number},
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
	},
	created: {
		type: Date,
		default: Date.now,
	},
	url: String,
});

dogSchema.index({'loc': '2dsphere'});
module.exports = mongoose.model("Dog", dogSchema);
