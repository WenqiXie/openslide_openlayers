


// 图形界面自动适应屏幕大小
view.fit(extent);
// 设置图层
// view.setZoom(12);
// view.setRotation(12*3.14/180);

// url: 'images/CMU-1_files/{z}/{x}_{y}.jpeg',
var e = function(s) {
  return document.querySelector(s)
}

// zoom 部分
$(".zoom-btn").click(function() {
  let scale = $(this).html().slice(1)
  view.animate({
    zoom: zoom + getBaseLog(2, scale),
    duration: 500
    })
  })
// 求出 x 为底 y 的对数
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x)
}

var ckXian = function() {
  var body  = document.querySelector('body')
  var style ='<style id="xm" media="screen"> * {outline: 1px red dashed!important} </style>'
  var i = false
  body.addEventListener('keydown', function(event) {
      if (event.keyCode === 77 && event.ctrlKey) {
          if (i) {
              var styletog = document.querySelector('#xm')
              styletog.remove()
              i = false
          } else {
              body.insertAdjacentHTML('afterbegin', style)
              i = true
          }
      }
  })
}() // 加载代码 使用 Ctrl + M 显示参考线
