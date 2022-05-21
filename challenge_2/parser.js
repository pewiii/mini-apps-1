class Parser {
  constructor(json) {
    try {
      this.json = JSON.parse(json);
      this.flat = flatten(this.json);
      this.csv = makeCSV(this.flat);

    } catch {
      this.csv = false;
    }
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
  var str = '';
  for (var i = 0; i < keys.length; i++) {
    str += keys[i] || '';
    if (i === keys.length - 1) {
      str += '\n';
    } else {
      str += ',';
    }
  }
  for (var i = 0; i < array.length; i++) {
    keys.forEach((key, index)=> {
      str += array[i][key];
      if (index === keys.length - 1) {
        str += '\n';
      } else {
        str += ',';
      }
    });
  }
  return str;
}

module.exports = Parser;



