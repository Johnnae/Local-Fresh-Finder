const { Market ,Farmer } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
  
    me: async (parent, args, context) => {
      if (context.farmer) {
        return farmer.findOne({ _id: context.farmer._id }).populate("Farmers");
      }
      throw AuthenticationError;
    },
    markets: async (parent, args, { listingName }) => {
      return Market.find({ listingName });
  },
  },
  Mutation: {
    // Takes in email and password as parameters and returns an Auth type.
    login: async (parent, { email, password }) => {
      const farmer = await Farmer.findOne({ email });

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
    addFarmer: async (parent, { farmername, email, password, bio, website, phone }) => {
      const farmer = await Farmer.create({ farmername, email, password, bio, website, phone });
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
