const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MongoDB Connection URI
const uri = 'mongodb+srv://harshavardhan:iloveharsha143@mycluster.su12qnc.mongodb.net/?retryWrites=true&w=majority';

// Database Name
const dbName = 'serverless';

// Create a new MongoClient
const client = new MongoClient(uri);

app.post('/login', async (request, response) => {
  const { username, password } = request.body;

  try {
    // Connect to the MongoDB server
    await client.connect();

    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Find the user by username
    const dbUser = await usersCollection.findOne({ username });

    if (dbUser === null) {
      response.status(400).send('Invalid User');
    } else {
      // Compare the provided password with the hashed password in the database
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password);

      if (isPasswordMatched) {
        const payload = {
          username: username,
        };

        // Generate JWT token
        const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN');

        response.send({ jwtToken });
      } else {
        response.status(400).send('Invalid Password');
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    response.status(500).send('Internal Server Error');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});
