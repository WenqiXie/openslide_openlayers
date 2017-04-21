//  例子抄自 http://openlayers.org/en/latest/apidoc/ol.interaction.Select.html
var selectedF;
var geometry;
var select = null;  // ref to currently selected interaction

// Popup showing the position the user clicked
var popup = new ol.Overlay({
  element: document.getElementById('popup')
});
map.addOverlay(popup);

// select interaction working on "click"
var selectClick = new ol.interaction.Select({
  condition: ol.events.condition.click
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
    map.addInteraction(select);
    select.on('select', function(e) {
      // console.log('触发 select');
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
  // console.log('selectedFeatures.length', selectedFeatures.length);

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
  // 选中状态更改鼠标右键
  selectedDelete(selectedFeaturesSourse, selectedFeatures)


  featuresSource.on('removefeature', function() {
    // console.log('removefeature');
    // changeInteraction('none')
    // setTimeout(function() {
    //   changeInteraction('click')
    // },100)
    $(popupElement).popover('destroy');
  })
}

var div_delete_feature = document.querySelector('#id-delete-feature')
var selectedDelete = function(selectedFeaturesSourse, selectedFeatures) {
  // console.log('selectedFeatures', selectedFeatures);
  // console.log('div_delete_feature.children', div_delete_feature.children);
  // var deleteButton = div_delete_feature.children[0]
  div_delete_feature.addEventListener('click', function(event) {
    let l = selectedFeatures.length
    for (var i = 0; i < l; i++) {
      let selectedF = selectedFeatures[i]
      // console.log('selectedF', i, selectedF);
      // 从数据库隐藏
      let id = selectedF.getId()
      let form = forms[id]
      // console.log('form', form);
      form.available = false
      featuresSource.removeFeature(selectedF)
    }
    selectedFeaturesSourse.clear()
    // console.log('form', form);
    // console.log('forms', forms);
    saveForms(forms)
  }, {once: true})
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
      <p>message: ${form.message}</p>
      <button data-id=${form.id} id="close-message" type="button" name="button"><div></div></button>
      <button data-id=${form.id} id="update-message" type="button" name="button">编辑</button>
    `
    // <button data-id=${form.id} id="delete-message" type="button" name="button">删除这个message</button>
    // '<p>The location you clicked was:</p><code>' + coordinate + '</code>'
  });

  $popupElement.popover('show');

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
    // $popupElement.popover('hide');

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
        <p><textarea id="message-message" type="text" name=""></textarea></p>
        <button data-id=${id} id="close-message1" type="button" name="button"><div></div></button>
        <button id="commit-message" type="button" name="button">保存</button>
      </div>`
    });
    $messageElement.popover('show');
    $("#message-message").val(form.message)
    // 给输入弹窗绑定事件
    $('#close-message1').on("click", function(event){
      // 取消输入，弹窗消失
      console.log('close-message');
      $messageElement.popover('destroy');
    });

    // 给保存按钮绑定事件
    $('#commit-message').on("click", function(event){

      form.message = $('#message-message').val()
      // console.log('forms', forms);
      console.log('form', form);
      // 因为都是 form 和 forms 都是指针，所以直接将 forms 保存到本地就好了
      saveForms(forms)

      $messageElement.popover('destroy');

      // $popupElement.popover('show');

      let $content = $('.popover-content')
      // console.log('content', $content);
      // console.log('$content.children(p)', $content.children('p'));
      $content.children('p').eq(0).text('message: ' + form.message)

    });

  })
}


/**
 * onchange callback on the select element.
 */
changeInteraction('click');
