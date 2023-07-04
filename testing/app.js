const express = require('express');
const serverless = require('serverless-http');

const app = express();

// GET method route
app.get('/api/users', (req, res) => {
  // Perform some operations to fetch users data
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
  ];

  res.json(users);
});

// Export the Express app wrapped with serverless-http
module.exports.handler = serverless(app);
