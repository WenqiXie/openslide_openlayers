var es = function(selector) {
  return document.querySelectorAll(selector)
}

var removeClassAll = function(className) {
  var cs = es("." + className)
  for (var i = 0; i < cs.length; i++) {
    cs[i].classList.remove(className)
  }
}

var bindAll = function(elements, e, fun) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener(e, fun)
  }
}
