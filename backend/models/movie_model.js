const mongoose = require('mongoose');

// Define a schema for the movie collection 
const tvShowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
}
});

// Compile model from schema
const TVShow = mongoose.model('TvShow', tvShowSchema);

// Export the Movies model
module.exports = TVShow;
