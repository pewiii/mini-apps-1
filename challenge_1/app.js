var Board = function() {
  this.turn = 'X';
  this.nextTurn = 'O';
  this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  this.win = false;
  this.count = 0;
  this.fullBoard = false;
}

Board.prototype.playTurn = function(location) {
  var [ row, col ] = location.split('-');
  if (!this.matrix[row][col]) {
    this.addPiece(row, col);
    this.switchTurn();
    this.count++;
    if (this.count > 8) { this.fullBoard = true; }
    return true;
  }
  return false;
}

Board.prototype.switchTurn = function() {
  var temp = this.turn;
  this.turn = this.nextTurn;
  this.nextTurn = temp;
}

Board.prototype.addPiece = function(row, col) {
  this.matrix[row][col] = this.turn === 'X' ? 1 : -1;
}

Board.prototype.checkWin = function(location) {
  var [ row, col ] = location.split('-');
  var matrix = this.matrix;
  var colTally = 0;
  var rowTally = 0;
  var diag1 = matrix[0][0] + matrix[1][1] + matrix[2][2];
  var diag2 = matrix[2][0] + matrix[1][1] + matrix[0][2];
  for (var i = 0; i < this.matrix.length; i++) {
    rowTally += matrix[row][i];
    colTally += matrix[i][col];
  }
  if (colTally === 3 || rowTally === 3 || diag1 === 3 || diag2 === 3) {
    return 'X Wins';
  } else if (colTally === -3 || rowTally === -3 || diag1 === -3 || diag2 === -3) {
    return 'O Wins';
  }
  return false;
}

var board = new Board();
var message = document.getElementById('message');
var spaces = document.querySelectorAll('td');

spaces.forEach(element => {
  element.addEventListener('click', e => {
    console.log(e.target.id);
    if (!board.win) {
      if (board.playTurn(e.target.id)) {
        e.target.style.color = board.turn === 'X' ? 'blue' : 'red';
        e.target.innerHTML = board.nextTurn;
        board.win = board.checkWin(e.target.id);
        message.innerHTML = board.win ? board.win + '!!!' : board.turn + "'s Turn";
        if (board.fullBoard) {
          message.innerHTML = 'Game Over!';
        }
      }
    }
  })
})

document.getElementById('reset').addEventListener('click', e => {
  board = new Board();
  message.innerHTML = "X's Turn";
  spaces.forEach(space => {
    space.innerHTML = '';
  })
});