//Mongoose set up
let mongoose = require("mongoose");

//Models set up
Dog = require("./dog");
User = require("./user");

function seed() {
    seedDogs = {
        "Paris": {
            age: 13,
            breed: "Corgi",
        },
        "Hillary": {
            age: 13,
            breed: "Dachshund",
        },
        "Babee": {
            age: 11,
            breed: "Puddle",
        },
    }

    User.remove({}, function(error) {
        if (error) {
            console.log("UNABLE TO REMOVE USERS WHEN SEEDING");
        }
    });
    Dog.remove({}, function(error) {
        if (error) {
            console.log("UNABLE TO REMOVE DOGS WHEN SEEDING");
        }
    });
    User.create({
        firstName: "Hanif",
        lastName: "Lim",
        nickName: "Han",
        username: "HanSolo",
        password: "password123",
        address: "330 De Neve Drive, Los Angeles, CA",
        numberOfDogs: 3,
        email: "hanifleoputeralim@gmail.com",
    }, function(error, createdUser) {
        if (error) {
            console.log("UNABLE CREATE USER WHEN SEEDING");
        } else {
            for (let key in seedDogs) {
                Dog.create({
                    name: key,
                    breed: key.breed,
                    age: key.age,
                    owner: createdUser,
                }, function(error, createdDog) {
                    if (error) {
                        console.log("UNABLE CREATE DOG WHEN SEEDING");
                    } else {
                        createdUser.update({
                            $push: {
                                dogs: createdDog
                            }
                        }, function(error, updatedUser) {
                            if (error) {
                                console.log("FAILED TO UPDATE PLAYER IN SEEDING");
                            }
                        });
                    }
                });
            }
        }
    });
}

module.exports = seed;