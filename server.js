const express=require("express");
const app=express();

const fs= require('fs');
const path= require('path');


//const {noteTitle,noteText}=require('./assets/js/index');
const PORT= process.env.PORT || 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public'));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname , "../public/index.html"));
});

app.get("/notes",(req,res)=>{
  res.sendFile(path.join(__dirname ,"./public/notes.html"));
  
  });
// should receive a new note to save on the rquest body add it to the db.json
//file and then return the new note to the client.
app.post("/api/notes", (req, res) =>{
  fs.readFile(__dirname + "/db/db.json", 'utf8',  (error, notes)=> {
    if (error) {
      return console.log(error)
    }
    notes = JSON.parse(notes)

    var activeNote = newFunction(notes, req);

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, data) {
      if (error) {
        return error
      }
      console.log(activeNote)
      res.json(activeNote);
    })
  })
})


app.get("/api/notes", (req, res)=> {
  // should read all files on db json and return all saved notes
  fs.readFile(__dirname + "/db/db.json", 'utf8',  (error, data)=> {
    if (error) {
      return console.log(error)
    }
    console.log("This is Notes", data)
    res.json(JSON.parse(data))
  })
});

app.delete("/api/notes/:id", (req, res)=> {
  const nId = JSON.parse(req.params.id);
  console.log(nId,'what is this?');
  fs.readFile(__dirname + "/db/db.json", 'utf8',  (error, notes)=> {
    if (error) {
      return console.log(error)
    }
    notes = JSON.parse(notes)
    
    notes = filterJson(notes, nId);

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
      if (error) {
        return error
      }
      res.json(notes)
    })
  })
});

app.listen(PORT,()=>{
 console.log(`Listening on ${PORT}`);
});

function newFunction(notes, req) {
  var id = generateID();


  var newNote = { title: req.body.title, text: req.body.text, id: id };
  var generatedNote = notes.concat(newNote);
  return generatedNote;

  function generateID() {
    return notes[notes.length -1].id+1;
  }
}

function filterJson(notes, nId) {
  notes = notes.filter(idValue => idValue.id !== nId);
  return notes;
}
