var es = function(selector) {
  return document.querySelectorAll(selector)
}

var removeClassAll = function(className) {
  var cs = es("." + className)
  for (var i = 0; i < cs.length; i++) {
    cs[i].classList.remove(className)
  }
}

var bindEvent = function(selector, listener, callback) {
  var ele = document.querySelector(selector)
  ele.addEventListener(listener, callback)
}

var bindAll = function(elements, listener, callback) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener(listener, callback)
  }
}

var toggleClass = function(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className)
  } else {
    element.classList.add(className)
  }
}

var toggle_style_display = function(element, style) {
  if (element.style.display == style) {
    element.style.display == 'none'
  } else {
    element.style.display = style
  }
}


var bindToSVG = function(target) {
  if (target.tagName != 'svg') {
    target = target.parentElement
  }
  return target
}
