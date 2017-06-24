const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  original_url: {
    type: String,
    required: 'You must supply a url!',
  },
  key: {
    type: String,
  },
  shortened_url: {
    type: String,
  },
});

module.exports = mongoose.model('Url', url);
