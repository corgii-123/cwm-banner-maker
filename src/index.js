import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'

// fabric.js
let fabric
if (process.env.NODE_ENV === 'development') {
  fabric = require('fabric').fabric
} else {
  fabric = require('fabric')
}

var canvas = new fabric.Canvas('canvas');

var rect = new fabric.Rect({
  top: 100,
  left: 100,
  width: 60,
  height: 70,
  fill: 'red'
});

canvas.add(rect);

ReactDOM.render(<App />, document.getElementById('app'))