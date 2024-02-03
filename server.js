
/// importing the required modules
const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express(); // create instance of express
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Require routes correctly
const apiRoutes = require('./routes/apiRoutes'); // API routes for note data
const htmlRoutes = require('./routes/htmlRoutes'); // Routes to serve the correct html pages

// usse the route modules
app.use('/api', apiRoutes); /// all '/api' routes handled by apiRoutes
app.use('/', htmlRoutes); // every other route is handled by htmlRoutes

//Starting the server and listen to the specified port
app.listen(PORT, () =>
  console.log(`App listening on PORT: http://localhost:${PORT}`)
);
