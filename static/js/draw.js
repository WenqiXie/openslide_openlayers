
var features = new ol.Collection();
var featuresSource = new ol.source.Vector({features: features})
// console.log('features', features);
var featureOverlay = new ol.layer.Vector({
  source: featuresSource,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)',
      // 白色 透明度 0.2
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      // 黄色
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      // 半径 7
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  })
});
featureOverlay.setMap(map);

// 将 message 加入覆盖层
var message = new ol.Overlay({
  element: document.getElementById('message')
});
map.addOverlay(message);

// 添加 feature 的方法，其实 Point
var addNewFeature = function(form) {
  var f;
  switch (form.type) {
    case 'Point':
      f = new ol.Feature({
        geometry: new ol.geom.Point(form.coordinates),
      })
      break;
    case 'LineString':
      f = new ol.Feature({
        geometry: new ol.geom.LineString(form.coordinates),
      })
      break;
    case 'Polygon':
      f = new ol.Feature({
        geometry: new ol.geom.Polygon(form.coordinates),
      })
      break;
    case 'Circle':
      f = new ol.Feature({
        geometry: new ol.geom.Circle(form.center, form.radius),
      })
      break;
    default:
  }
  // console.log('f', f);
  f.setId(form.id)
  featuresSource.addFeature(f);
}

if (localStorage.messages == undefined) {
  localStorage.messages = '[]'
}
var getForms = function() {
  return JSON.parse(localStorage.messages)
}

var forms = getForms()
// 把当前已经存在的 features 加载进来
var addFeatures = function() {
  // console.log('forms', forms);
  for (let form of forms) {
    // console.log(form);
    if (form.available) {
      addNewFeature(form)
    }
  }
}
addFeatures()


// ****************监听地图上的 feature 数量
var listenerKey = featuresSource.on('change', function(){
    if (featuresSource.getState() === 'ready') {    // 判定是否加载完成
        document.getElementById('count').innerHTML = featureOverlay.getSource().getFeatures().length;
        // featureOverlay.getSource().unByKey(listenerKey); // 注销监听器
        // console.log('featuresSource.getFeatures()', featuresSource.getFeatures());
    }
});


var draw; // global so we can remove it later
// var drawTypeSelect = document.getElementById('draw-type');

var geometry_menu = document.querySelector('.geometry_menu')

function addInteraction(geometry_type) {
  let value = geometry_type
  // console.log('value', value);
  if (value != 'None') {
    if (value == "freehand1") {
      draw = new ol.interaction.Draw({
        // 这个属性是当距离小于 50 的时候，就认为是一个 click 事件，打一个点
        // clickTolerance: 0,
        // 这个属性是当距离小于 80 的时候，就判断是在之前的点的范围内
        // snapTolerance: 80,
        // 修改了 63328 那几行的源码，可以优化自由手绘的效果
        features: features,
        type: 'Polygon',
        freehand: true
      });

    } else if (value == "Box") {
      draw = new ol.interaction.Draw({
        features: features,
        type: 'Circle',
        geometryFunction: ol.interaction.Draw.createBox()
      });
    } else if (value == "regularPolygon") {
      draw = new ol.interaction.Draw({
        features: features,
        type: 'Circle',
        geometryFunction: ol.interaction.Draw.createRegularPolygon(4)
      });

    } else {
      draw = new ol.interaction.Draw({
        features: features,
        type: /** @type {ol.geom.GeometryType} */ (value)
      });

    }
    map.addInteraction(draw);
    // 注册事件，判断是否画完，画完则触发响应函数
    draw.on('drawend', drawendEvent)

  }
}


var getFeaturesParameters = function(feature) {
  var geometry = feature.getGeometry() // 得到被选中元素的几何结构
  // console.log('selectedF geometry', geometry);
  let id = feature.getId() // 得到被选中元素的几何结构
  console.log('selectedF id', id);
  // 得到 feature 的类型
  var type = geometry.getType()
  // console.log('geometry type', type);
  switch (type) {
    case 'Point':
    case 'LineString':
    case 'Polygon':
    var coordinates = geometry.getCoordinates()
    // console.log('selectedF geometry coordinates', coordinates);
    return {id,type,coordinates}
    break;
    case 'Circle':
    var center = geometry.getCenter()
    var radius = geometry.getRadius()
    // console.log('center radius', center, radius);
    return {id,type,center,radius}
    break;
    default:
  }
}

var getInformation = function(parameters) {
  // 得到用户填写的数据
  // 定义 form
  var form = {
    id: parameters.id,
    title: '',
    message: '',
    type: parameters.type,
    coordinates: parameters.coordinates,
    center: parameters.center,
    radius: parameters.radius,
    available: true,
  }
  console.log('获取的form：', form)
  return form
}

var saveForms = function(forms) {
  localStorage.messages = JSON.stringify(forms)
}

var drawendEvent = function(event) {
  // 先取得画出来的这个 feature
  var drawendFeature = event.feature
  // console.log('drawendFeature', drawendFeature);
  // 给 feature 一个 id
  let id = forms.length
  console.log('id', id);
  drawendFeature.setId(id)

  // 然后取得 参数
  let parameters = getFeaturesParameters(drawendFeature)

  let form = getInformation(parameters)
  // 然后直接保存这个 feature 到数据库
  forms[id] = form
  saveForms(forms)

  // 取得鼠标当前的坐标，目前暂时发现了这个方法
  var mousePosition = document.querySelector('.ol-mouse-position').innerText
  mousePosition = mousePosition.split(",")
  // console.log('mousePosition', mousePosition);
  // 在鼠标位置弹出弹窗，请求输入信息
  // requestMessage(drawendFeature, mousePosition)
  // 再把状态更改一下
  setTimeout(function() {
    map.removeInteraction(draw);
    // 画完了就要进入 click 选取 的状态
    changeInteraction('click')
  },100)

}
