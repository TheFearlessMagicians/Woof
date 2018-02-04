//Mongoose set up
let mongoose = require("mongoose");

//Models set up
Dog = require("./dog");
User = require("./user");

function seed() {
    User.find({
        firstName: "Hanif",
    }, function(error, foundUsers) {
        if (error) {
            console.log(error);
        } else {
            seedDogs = {
                "Paris": {
                    age: 13,
                    breed: "Corgi",
                    isTherapyDog: true,
                    behaviourWithStrangers: "friendly & playful",
                    description: "Low-set, strong and sturdily built, the Pembroke Welsh Corgi gives an impression of substance in a small space. He is one of the most agreeable small house dogs, as well as an avid competitor in many dog sports, including conformation, herding and obedience. The Pembroke Corgi is a separate breed from the Cardigan Corgi, possessing a shorter body and straighter, lighter boned legs. His ears are pointed at the tip and stand erect, and he has a short tail. The coat can be red, sable, fawn, black and tan with or without white markings.",
                    location: [34.0689, -118.4452],
                },
                "Hillary": {
                    age: 13,
                    breed: "Dachshund",
                    isTherapyDog: false,
                    behaviourWithStrangers: "affectionate & playful",
                    description: "The Dachshund, meaning \"badger dog\" in German, is a lively breed with a friendly personality and keen sense of smell. Known for their long and low bodies, they are eager hunters that excel in both above- and below-ground work. One of the most popular breeds according to AKC® Registration Statistics, they come in three different coat varieties (Smooth, Wirehaired or Longhaired) and can be miniature or standard size.",
                    location: [34.052235, -118.243683],
                },
                "Babee": {
                    age: 11,
                    breed: "Puddle",
                    isTherapyDog: true,
                    behaviourWithStrangers: "aggressive",
                    description: "The Poodle, though often equated to the beauty with no brains, is exceptionally smart, active and excels in obedience training. The breed comes in three size varieties, which may contribute to why Poodle is one of the most popular breeds according to AKC® Registration statistics. Poodles can be a variety of solid colors, including white, black, apricot and gray, but never parti-colored.",
                    location: [34.0195, -118.4912],
                },
            }
            User.create({
                firstName: "Hanif",
                lastName: "Lim",
                nickName: "Han",
                username: "hanster69696969",
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
                            breed: seedDogs[key].breed,
                            age: seedDogs[key].age,
                            owner: createdUser,
                            geo:{"lng":seedDogs[key].location[0],"lat":seedDogs[key].location[1]}
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
    });
}

    module.exports = seed;
