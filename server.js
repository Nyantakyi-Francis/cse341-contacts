const express = require('express');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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