var geometry_menu = document.querySelector('.geometry_menu')

var rigthClickEvent = function(event) {
  // 阻止右键默认事件
  event.preventDefault();
  var x = event.pageX;
  var y = event.pageY;

  geometry_menu.style.left = x + "px";
  geometry_menu.style.top = y + "px";
}

$('canvas').on('contextmenu', rigthClickEvent)

document.body.onclick = function() {
  // 点击页面的时候 让右键菜单隐藏
  console.log();
  geometry_menu.style.left = 'auto';
  geometry_menu.style.top = '';
}

geometry_menu.onclick = function(event) {
  // console.log('event', event);
  let target = event.target
  console.log('target', target);
  // console.log('target.tagName', target.tagName);
  // if (target.tagName == 'svg') {
  //
  // }
  let geometry_type = target.dataset.type
  // if (geometry_type != "None") {
    console.log('geometry_type', geometry_type);
    map.removeInteraction(draw);
    addInteraction(geometry_type);
    changeInteraction('none')
  // } else {
  //   map.removeInteraction(draw);
  //   // 画完了就要进入 click 选取 的状态
  //   changeInteraction('click')
  // }
}

var canclePointState = function() {
  var cancel_point = document.querySelector('#id-cancel-point')
  // console.log('cancel_point', cancel_point);
  // var geometry_menu = document.querySelector('.geometry_menu')
  // let p = geometry_menu.children[0]
  // p.addEventListener('click', function(e) {
  //   console.log('cancel_point.style.display', cancel_point.style.display);
  //   cancel_point.style.display = "list-item"
  // })
  cancel_point.addEventListener('click', function(e) {
    console.log('e', e);
    map.removeInteraction(draw);
    // 画完了就要进入 click 选取 的状态
    changeInteraction('click')
  })
}
canclePointState()
