const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://harshavardhan:iloveharsha143@mycluster.su12qnc.mongodb.net/?retryWrites=true&w=majority';

// MongoDB database and collection names
const dbName = 'sample_airbnb';
const collectionName = 'listingsAndReviews'
// Lambda handler function
exports.handler = async (event, context) => {
  try {
    // Check if it's a GET request
    if (event.httpMethod === 'GET' && event.path === '/data') {
      // Create a new MongoClient
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Connect to the MongoDB cluster
      await client.connect();

      // Access the database and collection
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Fetch data from the collection
      const data = await collection.find().toArray();

      // Close the connection
      await client.close();

      // Return the fetched data as the Lambda response
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else {
      // Return an error response for unsupported methods
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Methods not allowed' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};
