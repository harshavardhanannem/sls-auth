const mongoose = require('mongoose');
const { connectDatabase } = require('../database/db');
const User = require('../models/user');
const { authenticateToken } = require('../middleware/auth');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const decodedToken = authenticateToken(event);

    await connectDatabase();
    const userId = event.pathParameters.userId;
    const userIdObj = new mongoose.Types.ObjectId(userId);
    console.log(userId);

    const updateResult = await User.updateOne(
      { _id: userIdObj },
      { $set: { name: 'aprup', email: 'updated@example.com' } }
    );

    if (updateResult.nModified === 0) {
      return {
        statusCode: 404,
        body: 'User not found',
      };
    }

    const updatedUser = await User.findById(userId);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedUser),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
