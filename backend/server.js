
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const tvshow = require('./models/movie_model');
const fs = require('fs');
const util = require('util');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());                                    //CORS For Cross Origin Resource Sharing
app.use(express.urlencoded({ extended: false }));
const readFileAsync = util.promisify(fs.readFile);

app.use(cors({
    origin: 'http://localhost:10000'
}));

app.get('/', (req, res) => {
    res.send('Hello TvShow API');
});

app.get('/search', async (req, res) => {
   const searchTerm = (req.query.q || '').toLowerCase(); // Get the search term from query parameter
    try {
        // Find distinct TV show names from MongoDB collection
        const matchingShows = await tvshow.find({ name: { $regex: searchTerm, $options: 'i' } })
            .distinct('name'); // Retrieve distinct names

        const top3Shows = matchingShows.slice(0, 3); // Limit to 3 results

        res.json({ result: top3Shows });
    } catch (error) {
        console.error('Error searching for TV shows:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

mongoose.connect('mongodb+srv://krishanthapathum:55265220220@searchapp.385rkcq.mongodb.net/?retryWrites=true&w=majority')
    .then(async () => {
        console.log('Connected to MongoDB..');
        try {
            const jsonData = require('../resources/data.json'); // Load JSON data directly
            const validShows = jsonData.shows.filter(show => show && show.trim() !== ''); // Filter out null and empty strings
            await tvshow.insertMany(validShows.map(show => ({ name: show }))); // Insert valid data into MongoDB
            console.log('TV shows inserted successfully');
        } catch (error) {
            console.error('Error inserting TV shows:', error);
        }
    })
    .catch(error => {
        console.error('Could not connect to MongoDB:', error.message);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

