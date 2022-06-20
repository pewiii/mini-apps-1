var express = require('express');
var path = require('path');
var dbSave = require('./db/index');

const PORT = 3000;

var app = express();

app.use(express.static('client'));
app.use(express.static('node_modules'))
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
})

app.post('/checkout', (req, res) => {
  console.log(req.body);
  dbSave(req.body, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});