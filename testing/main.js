const express = require('express');
const mongoose = require('mongoose');

// Import the Student model
const Student = require('./studentchema');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/harshadb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the route to fetch students
app.get('/students', (req, res) => {
  // Fetch all students from the database
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'An error occurred while fetching students' });
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
