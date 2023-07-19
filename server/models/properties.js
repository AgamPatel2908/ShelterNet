let mongoose = require('mongoose');

// create a model class
let Property = mongoose.Schema({
    Name: String,
    Price: Number,
    Location: String,
    Description: String
},
{
  collection: "properties"
});

module.exports = mongoose.model('Property', Property);
