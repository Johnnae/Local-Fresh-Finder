const { Schema } = require('mongoose');

// this is a subdocument schema for the 'markets' collection
const marketSchema = new Schema({
  marketId: {
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
  listingAddress: {
    type: String,
    required: true,
  },
});


module.exports = marketSchema;
