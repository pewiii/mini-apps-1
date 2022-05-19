var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Parser = require('./parser')

var app = express();
var port = 3000;

app.use(morgan('tiny'));
app.use(bodyParser());
app.use(express.static('client'));

app.post('/generate', (req, res) => {
  var parser = new Parser(req.body.data);
  console.log(parser.csv);
  res.sendFile(__dirname + '/client/index.html');
})

app.listen(port, () => {
  console.log('Listening on port', port);
});