//Mongoose set up
let mongoose = require("mongoose");

//Models set up
Dog = require("../dog");
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
    Dogs.remove({}, function(error) {
        if (error) {
            console.log("UNABLE TO REMOVE DOGS WHEN SEEDING");
        }
    });
    User.create({
        firstName: "Hanif",
        lastName: "Lim",
        nickName: "Han",
        numberOfDogs: 3,
        email: "hanifleoputeralim@gmail.com",
    }, function(error, createdUser) {
        if (error) {
            console.log("UNABLE CREATE USER WHEN SEEDING");
        } else {
            for (let i = 0; i < 3; i++) {
                Dog.create({
                    name: Object.keys(seedDogs)[i],
                    breed: seedDogs.name.breed,
                    age: seedDogs.name.age,
                }, function(error, createdDog) {
                    if (error) {
                        console.log("UNABLE CREATE DOG WHEN SEEDING");
                    } else {
                        // console.log(createdDog);
                    }
                });
            }
        }
    });


}

module.exports = seed;