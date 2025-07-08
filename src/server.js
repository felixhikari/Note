const Hapi = require('@hapi/hapi');
const router = require('./router/router');
const connectDB = require('./config/db');
const errorhandler = require('./middleware/errorHandler');

require('dotenv').config();

// Connect to MongoDB
const port = process.env.PORT || 9000;
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';


const init = async () => {
  await connectDB();
  const server = Hapi.Server({
    port,
    host,
    routes: {
      cors: {
        origin: ['*'], // Allow all origins
        credentials: true, // Allow credentials
        additionalHeaders: ['cache-control', 'x-requested-with']
      },
      validate: {
        failAction: errorhandler,
      },
    },
  });
  
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response.isBoom) {
      return errorhandler(response, request, h);
    }
    return h.continue;
  });

  server.route(router);
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

// mongosh "mongodb+srv://cluster0.k5sch.mongodb.net/" --apiVersion 1 --username ferrypradana228
init();
