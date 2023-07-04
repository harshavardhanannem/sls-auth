const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Connection URI
const uri = 'mongodb+srv://harshavardhan:iloveharsha143@mycluster.su12qnc.mongodb.net/?retryWrites=true&w=majority';

// MongoDB database and collection names
const dbName = 'sample_airbnb';
const collectionName = 'listingsAndReviews';

app.get('/users', async (req, res) => {
  try {
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

    // Return the fetched data as the response
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
