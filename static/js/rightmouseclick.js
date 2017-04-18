var rightmouseclick_contextmenu = document.querySelector('.rightmouseclick')

var rigthClickEvent = function(event) {
  // 阻止右键默认事件
  event.preventDefault();
  var x = event.pageX;
  var y = event.pageY;

  rightmouseclick_contextmenu.style.left = x + "px";
  rightmouseclick_contextmenu.style.top = y + "px";
  rightmouseclick_contextmenu.style.display = "block";
}

$('canvas').on('contextmenu', rigthClickEvent)

document.body.onclick = function() {
  // 点击页面的时候 让右键菜单隐藏
    rightmouseclick_contextmenu.style.display = "none";
}

rightmouseclick_contextmenu.onclick = function(event) {
  let target = event.target
  // console.log('target', target);
  let geometry_type = target.dataset.type
  if (geometry_type != "None") {
    console.log('geometry_type', geometry_type);
    map.removeInteraction(draw);
    addInteraction(geometry_type);
    changeInteraction('none')
  } else {
    map.removeInteraction(draw);
    // 画完了就要进入 click 选取 的状态
    changeInteraction('click')

  }
}

// var canclePointState = function() {
//   var cancel_point = document.querySelector('#id-cancel-point')
//   var geometry_menu = document.querySelector('.geometry_menu')
//   let p = geometry_menu.children[0]
//   p.addEventListener('click', function(e) {
//     console.log('cancel_point.style.display', cancel_point.style.display);
//     cancel_point.style.display = "list-item"
//   })
//   cancel_point.addEventListener('click', function(e) {
//     map.removeInteraction(draw);
//     // 画完了就要进入 click 选取 的状态
//     changeInteraction('click')
//   })
// }
// canclePointState()
