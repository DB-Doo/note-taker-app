const fs = require('fs'); // we'll need this file system module for reading and writing files
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');


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
  const newNote = { ...req.body, id: uuidv4() };
  //adds the new note to the arrray of existing notes
  notes.push(newNote);
  // write the updated array of the ntes back to the db.json file
  fs.writeFileSync('./db/db.json', JSON.stringify(notes)); // convert to json string before writing
  // this confirms the new note was added. responds to client requet with the new note
  res.json(newNote);
});

// Bonus delete route
router.delete('/notes/:id', (req, res) => {
  // read existing notes from db.json
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  // filter out the note with the given id
  notes = notes.filter((note) => note.id !== req.params.id);
  // write the updated notes array back to db.json
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  // Send a confirmation response
  res.json({ ok: true });
});


module.exports = router; //export router to use in server.js
