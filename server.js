const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing JSON data

// Define a test route
app.get('/', (req, res) => {
  res.send('Hello, this is the insurance tracker API!');
});

// Simulate a database (in-memory storage for simplicity)
let users = [];

// POST route for registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // Save the user (this is just an example, you'd hash passwords in real apps)
  users.push({ username, password });
  res.status(201).send('User registered successfully');
});

// POST route for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  res.send('Login successful');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
