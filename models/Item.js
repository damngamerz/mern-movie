const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  release_date: {
    type: String,
  },
  duration: {
    type: String,
  },
  actors: {
    type: String,
  },
  average_user_rating: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
