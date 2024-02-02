const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// require routes
const apiRoutes = require('./routes/apiRoutes');
const apiRoutes = require('./routes/htmlRoutes');

// use routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
    console.log('App listening at http://localhost:$(PORT)')
);