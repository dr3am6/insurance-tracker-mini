const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// Utility to read users from JSON file
function readUsers() {
  try {
    const data = fs.readFileSync('users.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Utility to write users to JSON file
function writeUsers(users) {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// POST /register route
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  let users = readUsers();

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  users.push({ username, password });
  writeUsers(users);

  res.status(201).send('User registered successfully');
});

// GET /users route for testing
app.get('/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
