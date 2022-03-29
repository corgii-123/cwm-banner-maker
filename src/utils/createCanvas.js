
// fabric.js
let fabric
if (process.env.NODE_ENV === 'development') {
  fabric = require('fabric').fabric
} else {
  fabric = require('fabric')
}

export function createFabric() {

  var canvas = new fabric.Canvas('canvas');

  var rect = new fabric.Rect({
    top: 100,
    left: 100,
    width: 60,
    height: 70,
    fill: 'red'
  });

  canvas.add(rect);

  return canvas
}

export function addCWM(nftData, canvas) {
  fabric.Image.fromURL(nftData[0].data.image, function (oImg) {
    // scale image down, and flip it, before adding it onto canvas
    oImg.scale(0.2).set('flipX', true);
    oImg.opacity = 0.5
    oImg.filters.push(new fabric.Image.filters.Polaroid());
    oImg.applyFilters();
    canvas.add(oImg);
    canvas.setActiveObject(oImg)
  }, { crossOrigin: 'anonymous' });
}