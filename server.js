var express = require("express");
var fs = require("fs");
var path = require("path");
var app = express();

app.use(express.static("public"));
app.use(express.static("db"));

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API routes
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    return res.json(JSON.parse(data));
  });
});

app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  fs.readFile("./db/db.json", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    const notes = JSON.parse(data);
    if (notes[notes.length - 1]) {
      newNote.id = notes[notes.length - 1].id + 1;
    } else {
      newNote.id = 1;
    }
    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), function (error) {
      if (error) {
        return console.log(error);
      }
      res.json(newNote);
    });
  });
});

app.delete("/api/notes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  fs.readFile("./db/db.json", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    const notes = JSON.parse(data);
    const note = notes.find((element) => element.id === id);
    console.log(note);
    notes.splice(notes.indexOf(note), 1);
    fs.writeFile("./db/db.json", JSON.stringify(notes), function (error) {
      if (error) {
        return console.log(error);
      }
      res.json(notes);
    });
  });
});

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
