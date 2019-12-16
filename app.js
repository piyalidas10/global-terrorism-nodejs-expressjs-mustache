// Load HTTP module
const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use('/', express.static(__dirname+'/public'));

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  res.render('index', {
    data: dataJson,
    'name': function () {
      return this.country.toLowerCase().split(" ").join("-");
    }
  });
});

// Prints a log once the server starts listening
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// CSV file to JSON
let dataJson = {};
const csvFilePath = 'top_terror_countries.csv';
const csv = require('csvtojson')
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    dataJson = jsonObj;
    // console.log(jsonObj);
  })
