//Mongoose set up
let mongoose = require("mongoose");

//Schema set up
let userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	nickName: String,
	numberOfDogs: Number,
	email: String,
	username: String,
	password: String,
	address: String,
	dogs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Dog",
	}],
	created: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userSchema);