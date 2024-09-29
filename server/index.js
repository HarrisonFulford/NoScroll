const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Allow cross-origin requests

const app = express();

app.use(cors());
app.use(express.json());  // To parse JSON body data

// Connect to MongoDB
mongoose.connect('mongodb+srv://harrisonfulford06:Carlwheezer5560.@hackgt-11.91tbj.mongodb.net/');

// Define a schema for screen time
const screen_time_Schema = mongoose.Schema({
    website: String,
    time_spent: Number
});

// Create a model
const time_model = mongoose.model('screen_time_info', screen_time_Schema);

// API to receive the screen time data from the Chrome extension
app.post("/addScreenTime", (req, res) => {
    const data = req.body;  // Data sent from the extension

    const entries = Object.keys(data).map(key => ({
        website: key,
        time_spent: data[key]
    }));

    time_model.insertMany(entries)
        .then(() => res.status(200).json({ message: 'Data saved successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});