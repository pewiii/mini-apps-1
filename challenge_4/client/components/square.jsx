import React from 'react';

var Square = (props) => {

  var cellStyle = {
    backgroundColor: 'ivory',
    width: 70,
    height: 70,
    display: "inline-block",
    margin: 0,
    boxShadow: "2px 2px 15px black",
    verticalAlign: "top",
    borderRadius: "10px"
  }

  var click = (e) => {
    var y = e.target.dataset.y;
    var x = e.target.dataset.x;
    var xSetBelow = document.querySelectorAll(`[data-y="${y}"]`);
    if (xSetBelow[0].classList[0] === 'played') {
      return;
    }
    for (var i = 0; i < xSetBelow.length; i++) {
      if (xSetBelow[i].classList[0] === 'played') {
        x = i - 1;
        break;
      }
      if (i === 5) {
        x = i;
      }
    }
    var spot = xSetBelow[x];
    props.play(spot);
  }

  return (
    <div style={cellStyle} data-x={props.x} data-y={props.y} onClick={click}></div>
  )
}

export default Square;