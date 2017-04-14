var rightmouseclick_contextmenu = document.querySelector('.rightmouseclick')
$('canvas').on('contextmenu', function(event) {
  // 阻止右键默认事件
  event.preventDefault();
  var x = event.pageX;
  var y = event.pageY;
  // console.log('x', x);
  // console.log('y', y);

  rightmouseclick_contextmenu.style.left = x + "px";
  rightmouseclick_contextmenu.style.top = y + "px";
  rightmouseclick_contextmenu.style.display = "block";

})

document.body.onclick = function() {
  // 点击页面的时候 让右键菜单隐藏
    rightmouseclick_contextmenu.style.display = "none";
}

rightmouseclick_contextmenu.onclick = function(event) {
  let target = event.target
  // console.log('target', target);
  let geometry_type = target.dataset.type
  if (geometry_type) {
    console.log('geometry_type', geometry_type);
    map.removeInteraction(draw);
    addInteraction(geometry_type);
    changeInteraction('none')
  }
}
