# Woof
This is Woof. It is Wilson's, Varun's and Hanif's HackUCI 2018 project submission.

## What is Woof?
Woof is an app for dog owners and dog lovers to connect with one another. Perfect for stressed out college students and those in need of a service animal/therapy puppy.

![Our app image](https://github.com/TheFearlessMagicians/Woof/blob/master/public/woof.png)

You can chat with dog owners and meet up with them anytime, anywhere!

![Our app image](https://github.com/TheFearlessMagicians/Woof/blob/master/public/in_app.png)

## Built with
* NodeJS
* MongoDB
* Express
* Socket.io
* Google Maps Javascript API
* Mailgun (email notifications)

## Running instructions

To run this app locally, clone the directory

`git clone https://github.com/TheFearlessMagicians/Woof.git`

Then, make sure you have the required dependencies installed: `npm`, `mongodb` and `nodejs`.

After that,
```sh
$ npm install;
$ mongod;
$ #in another terminal/shell: 
$ npm run dev
```

## Notice
To run with google maps and mailgun email notifications, create a directory in the root called /credentials with a file credentials.js in it with all your API key's needed. This includes Google Maps API key, and the mailgun API key (for email notifications of users).
```sh
$ cd woof #your woof directory
$ mkdir credentials
$ cd credentials
$ touch credentials.js
```

In credentials.js:
```javascript
 module.exports = {"mailgun":"YOUR MAILGUN KEY HERE",
                              "gmaps":"YOUR GOOGLE MAPS DEVELOPER KEY HERE"
   ```                 };
