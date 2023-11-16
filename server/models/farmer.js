const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// import schema from market.js
const marketSchema = require("./market");

const farmerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    phone: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    bio: {
      type: String,
    },
    companyName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // set savedmarkets to be an array of data that adheres to the marketSchema
    savedMarkets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Market'
      },
    ]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash farmer password
farmerSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


// custom method to compare and validate password for logging in
farmerSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// // when we query a farmer, we'll also get another field called `marketCount` with the number of saved markets we have
// farmerSchema.virtual("marketCount").get(function () {
//   return this.savedMarkets.length;
// });

const Farmer = model('Farmer', farmerSchema);

module.exports = Farmer;
