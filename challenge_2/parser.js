class Parser {
  constructor(json) {
    this.json = JSON.parse(json);
    this.flat = flatten(this.json);
    this.csv = makeCSV(this.flat);
  }
}

var flatten = function(current) {
  var children = current.children;
  var result = [{}];
  for (var key in current) {
    if (key !== 'children') {
      result[0][key] = current[key];
    }
  }
  for (var i = 0; i < children.length; i++) {
    result = result.concat(flatten(children[i]));
  }
  return result;
}

var makeCSV = function(array) {
  var keys = Object.keys(array[0]);
  var obj = {};
  for (var i = 0; i < keys.length; i++) {
    obj[keys[i]] = [];
  }
  for (var i = 0; i < array.length; i++) {
    for (var key in array[i]) {
      obj[key][i] = array[i][key];
    }
  }
  var str = '';
  for (var i = 0; i < array.length; i++) {

  }
}

module.exports = Parser;



