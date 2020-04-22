var express = require("express");
var fs = require("fs");
var path = require("path");
var app = express();

app.use(express.static("public"));
app.use(express.static("db"));

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
