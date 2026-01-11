const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts',
    version: '1.0.0'
  },
  host: 'cse341-contacts-b85h.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);