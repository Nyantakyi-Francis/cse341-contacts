const express = require('express');
const mongodb = require('./db/connect');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/', require('./routes'));

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to database and server is running on port ${port}`);
    });
  }
});