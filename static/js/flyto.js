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


function flyTo1(location, done) {
  var duration = 2000;
  var zoom = view.getZoom();
  var parts = 2;
  var called = false;
  function callback(complete) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    }
  }
  view.animate({
    center: location,
    duration: duration
  }, callback);
  view.animate({
    zoom: zoom - 1,
    duration: duration / 2
  }, {
    zoom: zoom,
    duration: duration / 2
  }, callback);
}
