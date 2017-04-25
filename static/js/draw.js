
// 添加 feature 的方法，其实 Point
var newFeature = function(form) {
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

  // f.setStyle(new ol.style.Style({
    // fill: new ol.style.Fill({
      // color: 'rgba(55, 55, 55, 0.2)',
      // 白色 透明度 0.2
    // }),
    // stroke: new ol.style.Stroke({
    //   color: form.color,
    //   width: form.width
    // }),
    // image: new ol.style.Circle({
    //   radius: 7,
    //   // 半径 7
    //   fill: new ol.style.Fill({
    //     color: form.color
    //   })
    // })

  // }))

  return f
}

var getForms = function() {
  if (localStorage.messages == undefined || localStorage.messages == 'undefined') {
    localStorage.messages = '[]'
  }
  var forms = JSON.parse(localStorage.messages)
  if (!Array.isArray(forms)) {
    localStorage.messages = '[]'
  }
  forms = JSON.parse(localStorage.messages)
  return forms
}

var forms = getForms()
// console.log('forms', forms);
// 把当前已经存在的 features 加载进来
var addFeatureAll = function() {
  // console.log('forms', forms);
  for (let form of forms) {
    // console.log(form);
    if (form.available) {
      let color = form.color
      // console.log('color', color);
      let f = newFeature(form)

      switch (color) {
        case '#f8691c':
          // console.log('#f8691c，红色');
          featuresSourceRed.addFeature(f);
          break;
        case '#f6a623':
          // console.log('#f6a623，橙色');
          featuresSourceOrange.addFeature(f);
          break;
        case '#50e3c2':
          // console.log('#50e3c2，绿色');
          featuresSourceGreen.addFeature(f);
          break;
        case '#4990e2':
          // console.log('#4990e2，蓝色');
          featuresSourceBlue.addFeature(f);
          break;
        case '#9012fe':
          // console.log('#9012fe，紫色');
          featuresSourcePurple.addFeature(f);
          break;
        default:
          // console.log('default，默认');
          featuresSource.addFeature(f);
      }

    }
  }
}
addFeatureAll()

// ****************监听地图上的 feature 数量
var listenerKey = featuresSource.on('change', function(){
    if (featuresSource.getState() === 'ready') {    // 判定是否加载完成
        // document.getElementById('count').innerHTML = featureOverlay.getSource().getFeatures().length;
        // featureOverlay.getSource().unByKey(listenerKey); // 注销监听器
        // console.log('featuresSource.getFeatures()', featuresSource.getFeatures());
    }
});

var draw; // global so we can remove it later
// var drawTypeSelect = document.getElementById('draw-type');

function addInteraction(geometry_type, features) {
  let value = geometry_type
  // console.log('value', value);
  if (value != 'None') {
    if (value == "freehand1") {
      draw = new ol.interaction.Draw({
        // 这个属性是当距离小于 50 的时候，就认为是一个 click 事件，打一个点
        // clickTolerance: 0,
        // 这个属性是当距离小于 80 的时候，就判断是在之前的点的范围内
        // snapTolerance: 80,
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
  // console.log('selectedF id', id);
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
  // console.log('获取的form：', form)
  return form
}

var saveForms = function(forms) {
  localStorage.messages = JSON.stringify(forms)
  // ajax(messages)
}

var drawendEvent = function(event) {
  // 先取得画出来的这个 feature
  var drawendFeature = event.feature
  console.log('drawendFeature', drawendFeature);
  // 给 feature 一个 id
  let id = forms.length
  // console.log('id', id);
  drawendFeature.setId(id)

  // 然后取得 参数
  let parameters = getFeaturesParameters(drawendFeature)

  let form = getInformation(parameters)

  let colorList = document.querySelector('.color-list')
  let color = colorList.dataset.color || '#ffcc33'
  form.color = color
  console.log('color', color);

  let strokeList = document.querySelector('.stroke-list')
  let width = strokeList.dataset.width || '2'
  strokeList.dataset.width = width
  form.width = width
  console.log('form', form);

  // drawendFeature.setStyle(new ol.style.Style({
  //   fill: new ol.style.Fill({
  //     color: 'rgba(255, 255, 255, 0.1)',
  //     // 白色 透明度 0.2
  //   }),
  //   stroke: new ol.style.Stroke({
  //     color: color,
  //     // 黄色
  //     width: width
  //   }),
  //   image: new ol.style.Circle({
  //     radius: 7,
  //     // 半径 7
  //     fill: new ol.style.Fill({
  //       color: color
  //     })
  //   })
  //
  // }))

  // 然后直接保存这个 feature 到数据库
  forms[id] = form
  saveForms(forms)

  // 取得鼠标当前的坐标，目前暂时发现了这个方法
  var mousePosition = document.querySelector('.ol-mouse-position').innerText
  mousePosition = mousePosition.split(",")
  // console.log('mousePosition', mousePosition);
  // console.log('form.type', form.type);
  if (form.type != 'Point') {
    setTimeout(function() {
      removeClassAll('active')
      map.removeInteraction(draw);
      // 画完了就要进入 click 选取 的状态
      changeInteraction('click')
    },100)
  }
}
