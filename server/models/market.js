const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `saveds` array in User.js
const marketSchema = new Schema({
  veg: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved  id from Googles api
  marketId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = marketSchema;
