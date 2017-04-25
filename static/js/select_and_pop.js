//  例子抄自 http://openlayers.org/en/latest/apidoc/ol.interaction.Select.html
var selectedF;
var selectedFstyles = {};
var geometry;
var select = null;  // ref to currently selected interaction
var div_delete_feature = document.querySelector('#id-delete-feature')

// Popup showing the position the user clicked
var popup = new ol.Overlay({
  element: document.getElementById('popup')
});
map.addOverlay(popup);

// 将 message 加入覆盖层
var message = new ol.Overlay({
  element: document.getElementById('message')
});
map.addOverlay(message);

// select interaction working on "click"
var selectClick = new ol.interaction.Select({
  condition: ol.events.condition.click,
  style: styles
  // styles 在 layersdef.js 里面
});

// var selectClick = new ol.interaction.Select({});


var changeInteraction = function(select_type) {
  if (select != null) {
    map.removeInteraction(select);
  }
  // var value = selectElement.value;
  var value = select_type;
  if (value == 'click') {
    select = selectClick;
  } else {
    select = null;
  }
  if (select != null) {
    // console.log("select" ,select);
    map.addInteraction(select);
    select.on('select', function(e) {
      console.log('触发 select');
      // 这一段是用来说明有几个元素被选取，有几个元素失去选取
      document.getElementById('status').innerHTML = '&nbsp;' +
          e.target.getFeatures().getLength() +
          ' selected features (last operation selected ' + e.selected.length +
          ' and deselected ' + e.deselected.length + ' features)';

      selectEvent(e)
    });
  }
};

var popupElement = popup.getElement();

var $messageElement = $('#message')
var selectedFeaturesSourse;
var selectEvent = function(e) {
  // pop 功能
  // 显示地图上的坐标
  var coordinate = e.mapBrowserEvent.coordinate;

  selectedFeaturesSourse = e.target.getFeatures()
  var selectedFeatures = selectedFeaturesSourse.getArray()
  // console.log('selectedFeaturesSourse', selectedFeaturesSourse);
  // console.log('e.selected', e.selected);
  // console.log('e.deselected', e.deselected);
  // console.log('selectedF', selectedF);
  if (selectedFeatures.length == 1) {
    // 被选中的 feature 个数为 1 的时候
    selectedF = selectedFeatures[0] // 表示第一个被选中的 feature
    // console.log('selectedF', selectedF);
    let id = selectedF.getId()
    // console.log('id', id);
    popMessage(id, coordinate)
  } else {
    $(popupElement).popover('destroy');
    $messageElement.popover('destroy');
  }

  // div_delete_feature 是 functionlist 里面的删除按钮
  div_delete_feature.addEventListener('click', function(event) {
    selectedDelete(selectedFeaturesSourse, selectedFeatures)
  }, {once: true})

  // 选中状态更改鼠标右键
  // div_delete_feature1 是单独的一个删除按钮，在选中之后，通过右键唤出
  var div_delete_feature1 = document.querySelector('#id-delete-feature1')
  div_delete_feature1.addEventListener('click', function(event) {
    selectedDelete(selectedFeaturesSourse, selectedFeatures)
    div_delete_feature1.style.display = "none";
  }, {once: true})

  // 改写右键事件
  // 同时，将选中的 feature 的 style 记录下来
  if (selectedFeatures.length >= 1) {
    // console.log('div_delete_feature', div_delete_feature);
    var deleteEvent = function(event) {
      // 阻止右键默认事件
      event.preventDefault();
      var x = event.pageX;
      var y = event.pageY;

      div_delete_feature1.style.left = x + "px";
      div_delete_feature1.style.top = y + "px";
      div_delete_feature1.style.display = "block";

    }
    // console.log('e.selected.length >= 1');
    $('canvas').off('contextmenu', rigthClickEvent)
    $('canvas').on('contextmenu', deleteEvent)
    $('.popover.top.in').on('contextmenu', deleteEvent)

    // 改写 style 样式
    let _selectedF = e.selected[0]
    console.log('_selectedF', _selectedF);
    let selectedFstyle = _selectedF.getStyle()
    console.log('selectedFstyle', selectedFstyle);
    _selectedF.setStyle(styles)
    let id = _selectedF.getId()
    console.log('id', id);

    selectedFstyles[id] = selectedFstyle
    console.log('selectedFstyles', selectedFstyles);

  } else {
    // console.log('e.selected.length', selectedFeatures.length);
    $('canvas').off('contextmenu', deleteEvent)
    $('canvas').on('contextmenu', rigthClickEvent)

    div_delete_feature1.style.left = ""
    div_delete_feature1.style.top = ""
    div_delete_feature1.style.display = "none";

  }

  let deselectedFs = e.deselected
  console.log('deselectedFs', deselectedFs);
  for (var i = 0; i < deselectedFs.length; i++) {
    let id = deselectedFs[i].getId()
    console.log('id', id);

    let selectedFstyle = selectedFstyles[id]
    console.log('selectedFstyle', selectedFstyle);
    deselectedFs[i].setStyle(selectedFstyle)
  }

}

var selectedDelete = function(selectedFeaturesSourse, selectedFeatures) {
  // console.log('selectedFeatures', selectedFeatures);
  // console.log('div_delete_feature.children', div_delete_feature.children);
  // var deleteButton = div_delete_feature.children[0]
    let l = selectedFeatures.length
    for (var i = 0; i < l; i++) {
      let selectedF = selectedFeatures[i]
      // console.log('selectedF', i, selectedF);
      // 从数据库隐藏
      let id = selectedF.getId()
      let form = forms[id]
      // console.log('form', form);
      form.available = false

      // // 取得颜色
      let color = form.color
      console.log("color", color);
      switch (color) {
        case '#f8691c':
          // console.log('#f8691c，红色');
          featuresSourceRed.removeFeature(selectedF);
          break;
        case '#f6a623':
          // console.log('#f6a623，橙色');
          featuresSourceOrange.removeFeature(selectedF);
          break;
        case '#50e3c2':
          // console.log('#50e3c2，绿色');
          featuresSourceGreen.removeFeature(selectedF);
          break;
        case '#4990e2':
          // console.log('#4990e2，蓝色');
          featuresSourceBlue.removeFeature(selectedF);
          break;
        case '#9012fe':
          // console.log('#9012fe，紫色');
          featuresSourcePurple.removeFeature(selectedF);
          break;
        default:
          console.log('default，默认');
          featuresSource.removeFeature(selectedF)
      }
      // featuresSource.removeFeature(selectedF)
    }
    selectedFeaturesSourse.clear()
    $(popupElement).popover('destroy');
    // console.log('form', form);
    // console.log('forms', forms);
    saveForms(forms)
}

var popMessage = function(id, coordinate) {
  forms = getForms()
  // var forms = getForms()
  var form = forms[id]
  // console.log('form', form);
  let $popupElement = $(popupElement)
  $popupElement.popover('destroy');
  popup.setPosition(coordinate);
  // the keys are quoted to prevent renaming in ADVANCED mode.
  $popupElement.popover({
    'placement': 'top',
    'animation': false,
    'html': true,
    'selector': false,
    'content': `
      message: <div id="id-message-content">${marked(form.message)}</div>
      <button data-id=${form.id} id="close-message" type="button" name="button"><div></div></button>
      <button data-id=${form.id} id="update-message" type="button" name="button">编辑</button>
    `
    // <button data-id=${form.id} id="delete-message" type="button" name="button">删除这个message</button>
    // '<p>The location you clicked was:</p><code>' + coordinate + '</code>'
  });

  $popupElement.popover('show');

  // var marked = require('marked')
  let messageContent = document.querySelector("#id-message-content")
  messageContent.innerHTML = marked(form.message)


  $('#close-message').on("click", function(event){
    // 取消输入，弹窗消失
    console.log('close-message');
    $popupElement.popover('destroy');
  });

  popEndEvent(id, popupElement, coordinate)

}


var popEndEvent = function(id, popupElement, coordinate) {

  let $popupElement = $(popupElement)
  var form = forms[id]
  $('#update-message').on('click', function(e) {
    console.log('编辑这个message');

    $('#popup + .popover.top').hide()

    let target = e.target
    let targetId = target.dataset.id
    // console.log('targetId', targetId);
    // console.log('selectedF', selectedF);
    // 弹窗组件
    $messageElement.popover('destroy');
    message.setPosition(coordinate);
    // the keys are quoted to prevent renaming in ADVANCED mode.
    if (form.title == "") {
      // title =
    } else {

    }
    if (form.message == "") {

    } else {

    }
    console.log('form', form);
    console.log('form.message', form.message);
    $messageElement.popover({
      'placement': 'top',
      'animation': false,
      'html': true,
      'selector': false,
      'content': `<div>
        <div class="textarea"><textarea id="message-message" type="text" name=""></textarea></div>
        <button data-id=${id} id="close-message1" type="button" name="button"><div></div></button>
        <button id="commit-message" type="button" name="button">保存</button>
      </div>`
    });
    $messageElement.popover('show');
    // $popupElement.popover("hide")
    $("#message-message").val(form.message)
    // 给输入弹窗绑定事件
    $('#close-message1').on("click", function(event){
      // 取消输入，弹窗消失
      console.log('close-message');
      $messageElement.popover('destroy');
      $('#popup + .popover.top').show()

    });

    // 给保存按钮绑定事件
    $('#commit-message').on("click", function(event){

      form.message = $('#message-message').val()
      // console.log('forms', forms);
      console.log('form', form);
      // 因为都是 form 和 forms 都是指针，所以直接将 forms 保存到本地就好了
      saveForms(forms)

      $messageElement.popover('destroy');

      $('#popup + .popover.top').show()

      let messageContent = document.querySelector("#id-message-content")
      messageContent.innerHTML = marked(form.message)

      let $content = $('.popover-content')
      // console.log('content', $content);
    });

  })
}


/**
 * onchange callback on the select element.
 */
changeInteraction('click');
