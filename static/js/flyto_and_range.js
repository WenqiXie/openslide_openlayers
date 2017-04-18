var flyTo = function(location) {
  let duration = 1600
  let currentZoom = view.getZoom();

  let callback = function() {
    console.log('callback');
  }

  view.animate({
    center: location,
    duration: duration
  }, callback);

  view.animate({
    zoom: currentZoom - 1,
    duration: duration / 2
  }, {
    zoom: currentZoom,
    duration: duration / 2
  }, callback);

}


var l = [21471.259434296473,-18272.379421772937]

// flyTo(l)


// Rotate

var range = document.querySelector('#id-range-rotate')
var range_mousemove = function() {
  // console.log('this', this);
  // console.log('this.value', this.value);
  let rotation = this.value * 3.14 / 180
  view.setRotation(rotation)
}
range.addEventListener('mousedown', function(event) {
  console.log('mousedown');
  this.addEventListener('mousemove', range_mousemove)
})
range.addEventListener('mouseup', function(event) {
  console.log('mouseup');
  // removeEventListener
  this.removeEventListener('mousemove', range_mousemove)
})

view.on('change:rotation', function(e) {
  // console.log('e1', e);
  let r = this.getRotation()
  console.log('r', r);
  range.value = r
})
