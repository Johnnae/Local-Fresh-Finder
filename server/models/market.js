const { Schema, model } = require('mongoose');

// this is a schema for the 'markets' collection
const marketSchema = new Schema({
  listing_id: {
    type: String,
    required: true,
  },
  updateTime: {
    type: String,
  },
  listingName: {
    type: String,
    required: true,
  },
  locationAddress: {
    type: String,
    required: true,
  },
});

const Market = model('Market', marketSchema);

module.exports = Market;
