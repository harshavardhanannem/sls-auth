const mongoose = require("mongoose");

let conn = null;

exports.connectDatabase = async () => {
  if (conn == null) {
    console.log("Creating new connection to the database....");
    conn = await mongoose.connect(process.env.DB, {
      serverSelectionTimeoutMS: 5000,
    });
    return conn;
  }
  console.log("Connection already established, try reusing the existing connection");
};




// const mongoose = require("mongoose");

// let conn = null;

// exports.connectDatabase = async () => {
//   if (conn == null) {
//     console.log("Creating new connection to the database....");
//     const poolSize = process.env.POOL_SIZE || 10; // Use POOL_SIZE environment variable or default to 10
//     conn = await mongoose.connect(process.env.DB, {
//       serverSelectionTimeoutMS: 5000,
//       poolSize: parseInt(poolSize, 10), // Convert poolSize to an integer
//     });
//     return conn;
//   }
//   console.log("Connection already established, try reusing the existing connection");
// };


