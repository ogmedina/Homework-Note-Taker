//Dependencies including express for server side, path for working with file and directory paths, and fs for the file system 
const express = require("express");
const path = require("path");
const fs = require("fs");

//Opens up express and sets a port, modified for Heroku
var app = express();
var PORT = process.env.PORT || 3000;

//Sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//starts an idcount for identification for deleting later
let idCount = 1;

//Route Setup

app.get("/api/notes", function (req, res){
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Post notes based on ID. Starts with 1 and reads notes using the json file
app.post("/api/notes", function (req, res){     
    let newNote = req.body;
    newNote.id = idCount++;    
    console.log(newNote);
    console.log(newNote.id);
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes.push(newNote);
        let updatedNotes = JSON.stringify(notes);
        fs.writeFile("./db/db.json", updatedNotes, err =>{
            if (err) throw err;
            else {
                return res.json(updatedNotes)
            }
        });
    });
});

//Deletes note based on ID number given when posted
app.delete("/api/notes/:id", function (req,res){
    var currentNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var deleteNoteID = req.params.id;
    console.log(deleteNoteID);
    currentNotes = currentNotes.filter(function (data){
        return data.id != deleteNoteID;
    });
    let deletedNotes = JSON.stringify(currentNotes);
    fs.writeFile("./db/db.json", deletedNotes, err =>{
        if (err) throw err;
        else {
            return res.json(deletedNotes);
        }
    });    
});
//console log for port number
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});