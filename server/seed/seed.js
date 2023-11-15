const db = require('../config/connection');
const { Market } = require('../models');
const marketData = require('./farmersmarkets.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Market', 'markets');
  await Market.create(marketData);

  console.log('all done!');
  process.exit(0);
});
