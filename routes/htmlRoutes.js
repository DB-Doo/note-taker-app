const path = require('path'); // this module is required for handling he file paths
const router = require ('express').Router(); // creating a router instance

// route for the notes.html page
router.get('/notes', (req, res) =>
//send the notes.file when someone accesses '/notes' 
    res.sendFile(path.join(__dirname, '..', 'public/notes.html'))
);
// route for the index.html page
router.get('*', (req, res) =>
// any route not previously defined will send them to the home page
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

module.exports = router; //export router to use in server.js