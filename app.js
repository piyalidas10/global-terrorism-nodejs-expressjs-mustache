// Load HTTP module
const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const mustacheExpress = require('mustache-express');

const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = express();

app.use('/', express.static(__dirname+'/public'));

// secure apps by setting various HTTP headers
app.use(helmet()); 
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  next(createError(404));
});

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
