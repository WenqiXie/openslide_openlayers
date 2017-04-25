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
  // 点击页面的时候 让右键菜单回去
  geometry_menu.style.left = 'auto';
  geometry_menu.style.top = '';
}

geometry_menu.onclick = function(event) {
  // console.log('event', event);
  let target = event.target
  // console.log('target.tagName', target.tagName);
  let geometry_type = target.dataset.type
  if (geometry_type == undefined) {
    // console.log('没点到');
    target = target.parentElement
    // console.log('target', target);
    geometry_type = target.dataset.type
  }
  console.log('target', target);
  removeClassAll('active')
  target.classList.add('active')
  // console.log('geometry_type', geometry_type);
  if (geometry_type != "None") {
    map.removeInteraction(draw);
    changeInteraction('None')

    // let colorList = document.querySelector('.color-list')
    // let color = colorList.dataset.color
    // console.log("color", color);
    // switch (color) {
    //   case '#f8691c':
    //     console.log('#f8691c，红色');
    //     addInteraction(geometry_type, featuresRed);
    //     break;
    //   case '#f6a623':
    //     console.log('#f6a623，橙色');
    //     addInteraction(geometry_type, featuresOrange);
    //     break;
    //   case '#50e3c2':
    //     console.log('#50e3c2，绿色');
    //     addInteraction(geometry_type, featuresGreen);
    //     break;
    //   case '#4990e2':
    //     console.log('#4990e2，蓝色');
    //     addInteraction(geometry_type, featuresBlue);
    //     break;
    //   case '#9012fe':
    //     console.log('#9012fe，紫色');
    //     addInteraction(geometry_type, featuresPurple);
    //     break;
    //   default:
    //     console.log('default，默认');
    //     addInteraction(geometry_type, features);
    // }

    addInteraction(geometry_type);

  } else {
    map.removeInteraction(draw);
    // 画完了就要进入 click 选取 的状态
    changeInteraction('click')
  }
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
// canclePointState()
// 调色板部分
bindEvent('.color-list > ul', 'click', function(e) {
  let target = e.target
  // console.log('target', target);
  if (target.dataset.color == undefined) {
    target = target.parentElement
    // console.log('target', target);
  }
  console.log('target.dataset.color', target.dataset.color);
  let color = target.dataset.color
  let colorList = document.querySelector('.color-list')
  colorList.style.backgroundColor = color
  colorList.dataset.color = color
})

bindEvent('.stroke-list > ul', 'click', function(e) {
  let target = e.target
  console.log('target', target);
  if (target.dataset.width == undefined) {
    target = target.parentElement
    console.log('target', target);
  }
  let width = target.dataset.width
  console.log('width', width);
  let strokeList = document.querySelector('.stroke-list')
  strokeList.dataset.width = width
})
