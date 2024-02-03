const fs = require('fs'); // we'll need this file system module for reading and writing files
const router = require('express').Router();

// function to generate unique IDs
// generate random number, scale it, then convert into hexadecimal 
// then take a substring to create a short id
// this doesnt guartantee a unique ID, but its fine for my small scale project

// maybe a function to check the last id made, then create a new unique id based on that would work better for future projects
const uuid = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

// this route will get all the notes
router.get('/notes', (req, res) => {
  // read the db.json file which stores all the notes
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8')); // uses utf8 encoding to get a readable string
  //send parsed notes as a JSON response to the client
  // this will allow the front end of the application to display the notes
  res.json(notes);
});


//api route for creating a new note
router.post('/notes', (req, res) => {
  // read the db.json file which stores all the notes
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8')); 
  //create a new note object combining the request body. Also pulls in unique id from uuid function above
  const newNote = { ...req.body, id: uuid() };
  //adds the new note to the arrray of existing notes
  notes.push(newNote);
  // write the updated array of the ntes back to the db.json file
  fs.writeFileSync('./db/db.json', JSON.stringify(notes)); // convert to json string before writing
  // this confirms the new note was added. responds to client requet with the new note
  res.json(newNote);
});


module.exports = router; //export router to use in server.js
