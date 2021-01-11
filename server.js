//Dependencies
var express = require("express");
var path = require("path")

//Opens up express and sets a port
var app = express();
var PORT = 3001;

//Sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Route Setup

app.use(express.static(path.join(__dirname, 'public')));


app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"));
});




app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});