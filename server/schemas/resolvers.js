const { assertType } = require("graphql");

const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
  
    me: async (parent, args, context) => {
      if (context.farmer) {
        return farmer.findOne({ _id: context.farmer._id }).populate("Farmers");
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addFarmer: async (parent, { farmername, email, password }) => {
      const farmer = await farmer.create({ farmername, email, password });
      const token = signToken(farmer);
      return { token, farmer };
    },
    login: async (parent, { email, password }) => {
      const farmer = await farmer.findOne({ email });

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
    removeFarmer: async (parent, { farmerText }, context) => {
      if (context.farmer) {
        const farmer = await farmer.create({
          farmerText,
          farmerVeg: context.farmer.farmername,
        });

        await farmer.findOneAndUpdate(
          { _id: context.farmer._id },
          { $addToSet: { farmers: farmer._id } }
        );

        return farmer;
      }
      throw AuthenticationError;
      ("You need to be logged in!");
    },
    addmarket: async (parent, { farmerId, marketText }, context) => {
      if (context.farmer) {
        return farmer.findOneAndUpdate(
          { _id: farmerId },
          {
            $addToSet: {
              markets: { marketText, marketVeg: context.farmer.farmername },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    removeMarket: async (parent, { farmerId, marketId }, context) => {
      if (context.farmer) {
        return farmer.findOneAndUpdate(
          { _id: farmerId },
          {
            $pull: {
              markets: {
                _id: marketId,
                marketAuthor: context.farmer.farmername,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};
module.exports = resolvers;
