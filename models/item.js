const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Item',
  // Define your model schema below:
  mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {

    },
    imageUrl: {

    },
  })
);
