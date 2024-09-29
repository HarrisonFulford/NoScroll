// Importing the required packages.
// express: A web framework for Node.js to handle routing and HTTP requests.
// mongoose: An ODM (Object Data Modeling) library to work with MongoDB databases.
const express = require('express');
const mongoose = require('mongoose');

// A simple console log to check if the code runs at all.
console.log("does this even work?");

// Creating an instance of the Express app to handle server requests.
const app = express();

// Connect to a MongoDB database. 
// 'mongodb://hack-gt-11' should be the MongoDB connection string. 
// Replace 'hack-gt-11' with the actual MongoDB URI for your app (e.g., 'mongodb://username:password@host:port/database').
mongoose.connect('mongodb://hack-gt-11/hack_gt_real');

// Defining a schema for the User model.
// This schema specifies that each User will have a 'name' (a String) and an 'age' (a Number).
const screen_time_Schema = mongoose.Schema({
    website: String,
    time_spent: Number 
});

// Creating a model named "users" based on the UserSchema.
// The first parameter is the collection name ('users' in MongoDB).
// The second parameter is the schema ('UserSchema').
const time_model = mongoose.model('screen_time_info', screen_time_Schema);

// Defining a GET route for '/getusers'.
// When a user visits '/getusers', this code retrieves all the users from the 'users' collection.
app.get("/getusers", (req, res) => {
    // Using 'find' to retrieve all users in the collection.
    time_model.find({}).then(function(screen_time_info) {
        // If successful, return the users as a JSON response.
        res.json(screen_time_info);
    }).catch(function(err) {
        // If an error occurs, log it to the console.
        console.log(err);
    });
});

// Starting the server on port 3001.
// When the server starts, it logs "server is running".
app.listen(3001, () => {
    console.log("server is running");
});