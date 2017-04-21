var annotation_menu = document.querySelector('.annotation-menu')

var annotationListTemp = function({id,message}) {
  // form = {
  //   available:true
  //   coordinates:Array(2)
  //   id:2
  //   message:""
  //   title:""
  //   type:"Point"
  // }

  let t = `
    <li><a data-id="${id}" href="#">${id}:${message}</a></li>
  `
  return t
}

var insertAnnotationAll = function(forms) {
  let html = ''
  for (let i = 0; i < forms.length; i++) {
    let form = forms[i]
    if (form.available) {
      // console.log('form', form);
      // 如果该注释可见，则加进来
      if (form.type != "Point" || form.message != "") {
        // 如果注释为点，又没有 message，就不加进来
        let t = annotationListTemp(form)
        html += t
      }
    }
  }
  annotation_menu.innerHTML = html
}


var annotationAll = function() {
  // 把所有的 annotation 请求过来，然后插到 html 里面去
  insertAnnotationAll(forms)
}
annotationAll()

annotation_menu.addEventListener('click', function() {
  let geometry;
  let target = event.target
  console.log('target', target);
  let id = target.dataset.id
  console.log('id', id);
  // let f = newFeature(forms[id])
  let form = forms[id]
  switch (form.type) {
    case 'Point':
      geometry = new ol.geom.Point(form.coordinates)
      break;
    case 'LineString':
      geometry = new ol.geom.LineString(form.coordinates)
      break;
    case 'Polygon':
      geometry = new ol.geom.Polygon(form.coordinates)
      break;
    case 'Circle':
      geometry = new ol.geom.Circle(form.center, form.radius)
      break;
    default:
  }
  let options = {
    duration: 400,
  }
  if (form.type == 'Point') {
    flyTo(form.coordinates)
  } else {

    view.fit(geometry, options)
  }
})
