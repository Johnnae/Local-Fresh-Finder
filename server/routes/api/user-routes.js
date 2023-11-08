const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveFarmer,
  deleteFarmer,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveFarmer);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/farmers/:farmerId').delete(authMiddleware, deleteFarmer);

module.exports = router;
