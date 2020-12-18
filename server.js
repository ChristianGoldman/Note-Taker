const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

console.log((path.join(__dirname, "/public/index.html")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// path to notes page

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", function (req, res) {
    res.json(notes);
})
// api routes for getting the notes from db.json
// json.parse on db.json
// res.json(path.join(__dirname, "/db/db.json"))
// 3 api routes 
// app.get
// app.post
// app.delete/destroy
app.post("/api/notes", function (req, res) {
    req.body
    // get all data from db.json
    // add id possibly loop to make sure no duplicate id's
    // save data to variable
    // updatge db.json with new notes
    // send new data back to the front end
    // check gitlab notes
})

app.delete("/api/notes/:id", function (req, res) {
    // read from db.json
    // identify specific id's
    // get rid of that specific id
    // re save the file with the new note gone/ update data base with deleted note
    // res.send new set of notes
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });