import React from 'react';
import Square from './square.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPlayer: 1,
      win: '',
      reset: true
    };
    this.playHandler = this.playHandler.bind(this);
    this.reset = this.reset.bind(this);
    this.boardStyle = {
      display: 'inline-block',
      width: 510,
      height: 430,
      backgroundColor: 'tan',
      boxShadow: "inset 2px 2px 20px black",
      paddingTop: "10px",
      borderRadius: "10px"
    }
    this.virtualMatrix = this.makeMatrix(() => 0);
    this.style = {
      textAlign: 'center'
    }
  }

  board() {
    return this.makeMatrix((x, y) => {
      return <Square key={x + '-' + y} x={x} y={y} play={this.playHandler} piece={this.state.currentPlayer}/>
    });
  }

  playHandler(spot) {
    if (this.state.win === '') {
      var x = Number(spot.dataset.x);
      var y = Number(spot.dataset.y);
      var currentColor = this.state.currentPlayer === 1 ? 'blue' : 'red';
      spot.classList.add('played');
      spot.style.backgroundColor = currentColor;
      spot.style.boxShadow = "inset 2px 2px 15px black";
      this.virtualMatrix[x][y] = this.state.currentPlayer;
      this.checkWin(x, y, (win) => {
        if (win) {
          var player = this.state.currentPlayer === 1 ? 1 : 2;
          this.setState({ win: 'Player ' + player + ' Wins!!!' })
        } else {
          var currentPlayer = this.state.currentPlayer === 1 ? -1 : 1;
          this.setState({ currentPlayer });
        }
      });
    }
  }

  checkWin(x, y, cb) {
    var current = this.virtualMatrix[x][y];
    var firstx = x;
    var firsty = y;
    for (var i = x; i >= 0; i--) {
      if (this.virtualMatrix[i][y] !== current) break;
      if (this.virtualMatrix[i][y] === current) firstx = i;
    }
    for (var i = y; i >= 0; i--) {

      if (this.virtualMatrix[x][i] !== current) break;
      if (this.virtualMatrix[x][i] === current) firsty = i;
    }
    var totalx = 0;
    var totaly = 0;
    for (var i = firstx; i < firstx + 4 && i < 6; i++) totalx += this.virtualMatrix[i][y];
    for (var i = firsty; i < firsty + 4 && i < 7; i++) totaly += this.virtualMatrix[x][i];

    if ((totalx > -4 && totalx < 4) && (totaly > -4 && totaly < 4)) {
      cb(this.checkDiagnal(current, x, y));
    } else {
      cb(true);
    }
  }

  checkDiagnal(current, x, y) {
    var firstLeft = {x, y};
    var firstRight = {x, y};
    for (var i = 0; i < 4; i++) {
      if ((x - i >= 0 && y - i >= 0) && this.virtualMatrix[x - i][y - i] === current) {
        firstLeft = {x: x - i, y: y - i};
      }
      if (( x-i >= 0 && this.virtualMatrix[x - i][y + i]) && this.virtualMatrix[x - i][y + i] === current) {
        firstRight = {x: x - i, y: y + i};
      }
    }
    var totalLeft = 0;
    var totalRight = 0;

    for (var i = 0; i < 4; i++) {
      if (this.virtualMatrix[firstLeft.x + i] && this.virtualMatrix[firstLeft.x + i][firstLeft.y + i] !== undefined) {
        totalLeft += this.virtualMatrix[firstLeft.x + i][firstLeft.y + i];
      }
      if (this.virtualMatrix[firstRight.x + i] && firstRight.y - i >= 0) {
        totalRight += this.virtualMatrix[firstRight.x + i][firstRight.y - i];
      }
    }

    return !((totalLeft > -4 && totalLeft < 4) && (totalRight > -4 && totalRight < 4));
  }


  makeMatrix(cb) {
    var matrix = [];
    for (var x = 0; x < 6; x++) {
      var row = [];
      for (var y = 0; y < 7; y++) {
        row.push(cb(x, y));
      }
      matrix.push(row);
    }
    return matrix;
  }

  reset() {
    this.virtualMatrix = this.makeMatrix(() => 0);
    this.setState({reset: false}, () => {
      this.setState({
        currentPlayer: 1,
        win: '',
        reset: true
      });
    });
  }

  render() {
    return (
      <div style={this.style}>
        <h1>Connect 4</h1>
        <div id="board" style={this.boardStyle}>
          {this.state.reset === true && this.board()}
        </div>
        <h2>{this.state.win}</h2>
        <button onClick={this.reset}>Restart</button>
      </div>

    );
  }
}

export default App;