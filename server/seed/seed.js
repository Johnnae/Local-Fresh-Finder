const db = require('../config/connection');
const { Market } = require('../models');
const cleanDB = require('./cleanDB');

const marketData = require('./farmersmarkets.json');

db.once('open', async () => {
  // clean database
  await cleanDB("Market", "markets");

  // bulk create each model
  const market = await Market.insertMany(marketData);

  console.log('all done!');
  process.exit(0);
});
