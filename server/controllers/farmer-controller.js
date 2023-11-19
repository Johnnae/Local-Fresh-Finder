// import farmer model
const { Farmer } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  async getSingleFarmer({ farmer = null, params }, res) {
    const foundFarmer = await Farmer.findOne({
      $or: [{ _id: user ? farmer._id : params.id }, { username: params.username }],
    });

    if (!foundFarmer) {
      return res.status(400).json({ message: 'Cannot find a farmer with this id!' });
    }

    res.json(foundFarmer);
  },
  // create a farmer, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createFarmer({ body }, res) {
    const farmer = await Farmer.create(body);

    if (!farmer) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // login a farmer, sign a token, and send it back (to client/src/components/LoginForm.jsx)
  // {body} is destructured req.body
  async login({ body }, res) {
    const farmer = await Farmer.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!farmer) {
      return res.status(400).json({ message: "Can't find this farmer" });
    }

    const correctPw = await farmer.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(farmer);
    res.json({ token, user });
  },
  // save a Farmer by adding it to the set (to prevent duplicates)
  // farmer comes from `req.user` created in the auth middleware function
  async savedFarmer({ farmer, body }, res) {
    console.log(farmer);
    try {
      const updatedFarmer = await Farmer.findOneAndUpdate(
        { _id: farmer._id },
        { $addToSet: { savedFarmers: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedFarmer);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  // remove a Farmer from `savedFarmers`
  async deleteFarmer({ farmer, params }, res) {
    const updatedFarmer = await Farmer.findOneAndUpdate(
      { _id: farmer._id },
      { $pull: { savedFarmers: { farmerId: params.farmerId } } },
      { new: true }
    );
    if (!updatedFarmer) {
      return res.status(404).json({ message: "Couldn't find a farmer with this id!" });
    }
    return res.json(updatedFarmer);
  },
};