const express = require('express')
const app = express()
const http = require('http');
const loaders = require('./server/Loaders');

//get port from .env file
require('dotenv').config();
const PORT  = process.env.PORT || 3001

//setup server and call loaders to link routes
async function startServer() {
  //Call loaders
  loaders(app)
  /**
   * Get port from environment and store in Express.
   */
  var port = normalizePort(PORT )
  app.set('port', port)

  //Add a static path for each route
  app.use('/', express.static('Client/build'));
  app.use("/products", express.static('Client/build'));
  app.use("/checkout", express.static('Client/build'));
  app.use("/login", express.static('Client/build'));
  app.use('/manifest.json', express.static('Client/build'));
  /**
   * Create HTTP server.
   */
  var server = http.createServer(app)

  /**
   * Listen on provided port, on all network interfaces.
   */
  
  server.listen(port)
  server.on('error', onError)
  server.on('listening', (onListening) => {
    console.log(`Listening on port ${port}`)
  })
  

  /**
   * Normalize a port into a number, string, or false.
   */
  function normalizePort(val) {
    var port = parseInt(val, 10)

    if (isNaN(port)) {
      // named pipe
      return val
    }

    if (port >= 0) {
      // port number
      return port
    }

    return false
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }
}

startServer();
