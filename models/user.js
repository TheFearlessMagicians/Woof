//Mongoose set up
let mongoose = require("mongoose");

//Passport set up 
	passportLocalMongoose = require("passport-local-mongoose");

//Schema set up
let userSchema = new mongoose.Schema({
	name: String,
	nickName: String,
	numberOfDogs: Number,
	email: String,
	username: String,
	password: String,
	address: {
		houseAddress: String,
		city: String,
		state: String,
		zip: String,
	},
	url: String,
	dogs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Dog",
	}],
	created: {
		type: Date,
		default: Date.now,
	},
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);