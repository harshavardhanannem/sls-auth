const { connectDatabase } = require("../database/db");
const User = require("../models/user");

module.exports.updateUser = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // Connect to the database
    await connectDatabase();  
    const authHeader = event.headers['Authorization'];
    console.log(authHeader)

    // Update the user
    const filter = { name: "Harsha" }; // Specify the filter to find the user
    const update = { $set: {name: "nk" } }; // Specify the update operation
    const result = await User.updateOne(filter, update);
    

    if (result.modifiedCount > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "User updated successfully" }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Requested user not found" }),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
