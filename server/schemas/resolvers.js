const { Market ,Farmer } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
  
    me: async (parent, args, context) => {
      if (context.farmer) {
        return Farmer.findOne({ _id: context.farmer._id }).populate("Farmers");
      }
      throw AuthenticationError;
    },
    markets: async (parent, args, context) => {
      
      const markets = Market.find({});
      console.log(markets);
      return markets;
  },
    market: async (parent, args, context ) => {
      return Market.findOne({listingName: context.listing_name});
      console.log(context)
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
      console.log(email, phone, website, bio, companyName, password);
      const farmer = await Farmer.create(
        { email, phone, website, bio, companyName, password },
        );
      const token = signToken(farmer);
      return { token, farmer };
    },
    
    saveMarket: async (parent, { marketData }, context) => {
      if (context.farmer) {
        const updatedUser = await Farmer.findOneAndUpdate(
          { _id: farmerId },
          { $push: { markets: marketData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },

    removeMarket: async (parent, {  marketId }, context) => {
      if (context.farmer) {
        const updatedUser = await Farmer.findOneAndUpdate(
          { _id: context.farmer._id },
          { $pull: { markets: {marketId} } },
          { new: true }
        )
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};
module.exports = resolvers;
