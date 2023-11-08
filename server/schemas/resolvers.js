const { assertType } = require("graphql");
const { User, farmer } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
  
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("users");
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { userText }, context) => {
      if (context.user) {
        const user = await User.create({
          userText,
          userAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { users: user._id } }
        );

        return user;
      }
      throw AuthenticationError;
      ("You need to be logged in!");
    },
    addfarmer: async (parent, { userId, farmerText }, context) => {
      if (context.user) {
        return user.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              farmers: { farmerText, farmerAuthor: context.user.username },
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

    removeFarmer: async (parent, { userId, farmerId }, context) => {
      if (context.user) {
        return user.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              farmers: {
                _id: farmerId,
                farmerAuthor: context.user.username,
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
