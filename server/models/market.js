const { Schema, model } = require('mongoose');

// this is a subdocument schema for the 'markets' collection
const marketSchema = new Schema({
  listing_id: {
    type: String,
    required: true,
  },
  updateTime: {
    type: String,
  },
  listing_name: {
    type: String,
    required: true,
  },
  location_address: {
    type: String,
    required: true,
  },
});

const Market = model('Market', marketSchema);

module.exports = Market;
