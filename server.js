const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");
// setting up express app
const app = express();
let PORT = process.env.PORT || 3000;

// sets up the express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

console.log(path.join(__dirname, "/public/index.html"));
// path to home page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// path to notes page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// path to
app.get("/api/notes", function (req, res) {
  res.json(notes);
});
app.post("/api/notes", function (req, res) {
  // setting user input objest to variable
  let newNote = req.body;
  // creating variable to be used later
  let idUpdate;
  // setting up if statement if user wishes to update notes.
  if (req.body.id) {
    // setting variable equal to object id
    idUpdate = req.body.id;
  } else {
    // if no update set id to start at 1
    req.body.id = notes.length + 1;
  }
  let existingNote;
  // looping through notes object to increment id by 1
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    if (note.id === parseInt(idUpdate)) {
      existingNote = note;
    }
  }
  // setting existing note values equal to note values
  if (existingNote) {
    existingNote.title = newNote.title;
    existingNote.text = newNote.text;
  } else {
  }
  // pushing newNote to db.json array
  notes.push(newNote);
  // writing the file and turning the JSON object into a string
  fs.writeFile("db/db.json", JSON.stringify(notes), "utf8", function (err) {
    if (err) throw err;
    console.log("Note saved!");
  });
  // returning updated note object to front end
  res.send(notes);
});

app.delete("/api/notes/:id", function (req, res) {
  // setting variable equal to object id
  const idDelete = req.params.id;
  // looping through object to determine what note user wishes to delete
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    if (note.id === parseInt(idDelete)) {
      // using splice to delete note and index of I and deleting one element
      notes.splice(i, 1);
    }
  }
  // writingt file to db.json and turning object to string
  fs.writeFile("db/db.json", JSON.stringify(notes), "utf8", function (err) {
    if (err) throw err;
  });
  // returning updated deleted note to the front end
  res.send(notes);
});
// starts the server to being listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
