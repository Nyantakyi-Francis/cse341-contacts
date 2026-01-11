const swaggerAutogen = require('swagger-autogen')();


const isProduction = process.env.NODE_ENV === 'production';

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts',
    version: '1.0.0'
  },
  host: isProduction ? 'cse341-contacts-b85h.onrender.com' : 'localhost:3000',
  schemes: isProduction ? ['https'] : ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);