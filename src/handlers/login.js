const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectDatabase } = require("../database/db");
const User = require("../models/user");

module.exports.handler = async (event, context, callback) => {
  try {
    const { username, password } = JSON.parse(event.body);
    await connectDatabase();

   
    const dbUser = await User.findOne({ name: username });
    console.log(dbUser.password)

    if (!dbUser) {
      return callback(null, { statusCode: 400, body: 'Invalid User' });
    }

    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    console.log(isPasswordMatched)
    if (isPasswordMatched) {
      const payload = {
        username: username,
      };

      const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN');

      return callback(null, { statusCode: 200, body: JSON.stringify({ jwtToken }) });
    } else {
      return callback(null, { statusCode: 400, body: 'Invalid Password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return callback(null, { statusCode: 500, body: 'Internal Server Error' });
  }
};
