var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Parser = require('./parser');
var fs = require('fs');

var app = express();
var port = 3000;

app.use(morgan('tiny'));
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(express.static('client'));
app.use(express.static('node_modules'));
app.set('view engine', 'ejs');

app.post('/generate', (req, res) => {
  var parser = new Parser(req.body.data);
  if (parser.csv) {
    fs.writeFile('latestcsv.csv', parser.csv, err => {
      console.error(err);
    });
    var data = parser.csv.replaceAll('\n', '<br>');
    res.render('dataTemplate', { data: data });
  } else {
    res.send('Bad File');
  }
});

app.get('/download', (req, res) => {
  res.sendFile(__dirname + '/latestcsv.csv');
});

app.listen(port, () => {
  console.log('Listening on port', port);
});