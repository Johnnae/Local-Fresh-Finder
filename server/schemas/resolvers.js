const { Market ,Farmer } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
  
    farmer: async (parent, {farmerId}) => {
      if (farmerId) {
        const farmer = await Farmer.findOne({ _id: farmerId }).select('-__v -password').populate('savedMarkets');
        return farmer;
      }
    },
    markets: async () => {
      
      const markets = Market.find();
      console.log(markets);
      return markets;
  },
    market: async (parent, {marketId} ) => {
      console.log(marketId)
      const market = await Market.findById({ _id: marketId});
      return market
      
    },
  },
  Mutation: {
    // Takes in email and password as parameters and returns an Auth type.
    login: async (parent, { email, password }) => {
      const farmer = await Farmer.findOne({ email });
      console.log(email, password)
      if (!farmer) {
        throw AuthenticationError;
      }

      const correctPw = await farmer.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(farmer);

      return { token, farmer };
    },
    // Adds user to database and returns an Auth type. Takes in username, email, and password as parameters.
    addFarmer: async (parent, { email, phone, website, bio, companyName, password}) => {
      const farmer = await Farmer.create(
        { email, phone, website, bio, companyName, password }
        );
      const token = signToken(farmer);
      return { token, farmer };
    },
    
    saveMarket: async (parent, { marketId, farmerId }, context) => {
      try {
        const farmer = await Farmer.findById(farmerId);
        if (!farmer) {
          throw new Error("Farmer not found");
        }

        const market = await Market.findById(marketId);
        if (!market) {
          throw new Error("Market not found");
        }

        if (farmer.savedMarkets.includes(marketId)) {
          throw new Error("Market already added");
        }

        farmer.savedMarkets.push(marketId);
        await farmer.save();
        return farmer;
        
      } catch (error) {
        throw new Error(`Error adding market to farmer: ${error.message}`);
    }
  },

    removeMarket: async (parent, {  farmerId, marketId }, context) => {
      try {
        const farmer = await Farmer.findById(farmerId);
        if (!farmer) {
          throw new Error("Farmer not found");
        }
        const market = await Market.findById(marketId);
        if (!market) {
          throw new Error("Market not found");
        }
        if (!farmer.savedMarkets.includes(marketId)) {
          throw new Error("Market already added");
        }
        farmer.savedMarkets.pull(marketId);
        await farmer.save();
        return farmer;
      } catch (error) {
        throw new Error(`Error removing market to farmer: ${error.message}`);
      }
    },
  },
};
module.exports = resolvers;
