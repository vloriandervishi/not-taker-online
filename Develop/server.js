const express = require("express");
const app = express();
//const {noteFile}=require("../db/db.json");
const fs = require("fs");
const path = require("path");
//const {noteTitle,noteText}=require('./assets/js/index');
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.post("/api/notes", (req, res) => {
  fs.readFileSync(__dirname, "./db/db.json", "UTF-8");
  newNotes = JSON.parse(newNotes);
  const applyId = newNotes[newNotes.length - 1].id + 1;
  const newObjectNote = {
    title: req.body.title,
    text: req.body.text,
    id: applyId,
  };
  const hoverNote = newNotes.concat(newObjectNote);
  fs.writeFileSync(__dirname, "./db/db.json", JSON.stringify(hoverNote));
  console.log(hoverNote);
  res.json(hoverNote);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
