const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { connectDatabase } = require('../database/db');
const User = require('../models/user');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const authHeader = event.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        body: 'Invalid Access Token',
      };
    }

    // Extract the JWT token
    const jwtToken = authHeader.split(' ')[1];

    // Verify the JWT token
    const decodedToken = jwt.verify(jwtToken, 'MY_SECRET_TOKEN');
    if (!decodedToken) {
      return {
        statusCode: 401,
        body: 'Invalid Access Token',
      };
    }

    await connectDatabase();

    // Get the user ID from the decoded token
    const userId = event.pathParameters.userId;

    // Delete the user
    const deleteResult = await User.deleteOne({ _id: userId });

    // Check if the delete was successful
    if (deleteResult.deletedCount === 0) {
      return {
        statusCode: 404,
        body: 'User not found',
      };
    }

    return {
      statusCode: 200,
      body: 'User deleted successfully',
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
