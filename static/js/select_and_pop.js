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
// var selectClick = new ol.interaction.Select({
//   condition: ol.events.condition.click
// });

var selectClick = new ol.interaction.Select({});

var select_state = document.getElementById('id-input-select_type');



var changeInteraction = function(select_type) {
  if (select !== null) {
    map.removeInteraction(select);
  }
  // var value = selectElement.value;
  var value = select_type;
  if (value == 'click') {
    select = selectClick;
  } else {
    select = null;
  }
  if (select !== null) {
    map.addInteraction(select);
    select.on('select', function(e) {
      console.log('触发 select');
      // 这一段是用来说明有几个元素被选取，有几个元素失去选取
      document.getElementById('status').innerHTML = '&nbsp;' +
          e.target.getFeatures().getLength() +
          ' selected features (last operation selected ' + e.selected.length +
          ' and deselected ' + e.deselected.length + ' features)';

      var popupElement = popup.getElement();
      if (e.selected.length == 1) {
        // 被选中的 feature 个数为 1 的时候
        // 显示地图上的坐标
        var coordinate = e.mapBrowserEvent.coordinate;
        // console.log('coordinate', coordinate);

        // console.log('e.target', e.target);
        // e.target 是一个 ol.interaction.Select 对象
        // 使用 getFeatures 方法可以获得一个 ol.Collection

        // selectedFeature = e.target.getFeatures().array_[0]
        var selectedFeatures = e.target.getFeatures().getArray()
        var selectedF = selectedFeatures[0] // 表示第一个被选中的 feature
        console.log('selectedF', selectedF);
        popMessage(selectedF, popupElement, coordinate)
      } else {
        $(popupElement).popover('destroy');
        $messageElement.popover('destroy');

      }
    });
  }
};

var popMessage = function(selectedF, popupElement, coordinate) {
  let id = selectedF.getId()
  console.log('id', id);

  // 如果 id 存在，则弹出给定内容
  var forms = JSON.parse(localStorage.messages)
  var form = forms[id]
  // displayMessage(id)
  // console.log('selectedF geometry getProperties', coordinates);
  // console.log('selectedF geometry getLayout', geometry.getLayout());
  let $popupElement = $(popupElement)
  $popupElement.popover('destroy');
  popup.setPosition(coordinate);
  // the keys are quoted to prevent renaming in ADVANCED mode.
  $popupElement.popover({
    'placement': 'top',
    'animation': false,
    'html': true,
    'content': `
      <p>title: ${form.title}</p>
      <p>message: ${form.message}</p>
      <button data-id=${form.id} id="update-message" type="button" name="button">修改这个message</button>
      <button data-id=${form.id} id="delete-message" type="button" name="button">删除这个message</button>
    `
    // '<p>The location you clicked was:</p><code>' + coordinate + '</code>'
  });
  $popupElement.popover('show');
  $('#delete-message').one('click', function(e) {
    $popupElement.popover('destroy');

    console.log('删除这个message');
    let target = e.target
    let targetId = target.dataset.id
    // console.log('targetId', targetId);
    // console.log('selectedF', selectedF);
    // 从界面删除
    featuresSource.removeFeature(selectedF)
    // 从数据库隐藏
    // console.log('form', form);
    form.available = false
    // console.log('form', form);
    console.log('forms', forms);
    localStorage.messages = JSON.stringify(forms)
  })

  $('#update-message').one('click', function(e) {
    console.log('修改这个message');
    $popupElement.hide()

    let target = e.target
    let targetId = target.dataset.id
    // console.log('targetId', targetId);
    // console.log('selectedF', selectedF);
    // 弹窗组件
    $messageElement.popover('destroy');
    message.setPosition(coordinate);
    // the keys are quoted to prevent renaming in ADVANCED mode.
    $messageElement.popover({
      'placement': 'top',
      'animation': false,
      'html': true,
      'content': `<p>
        title: <input id="message-title" type="text" name="" value="${form.title}">
        message: <input id="message-message" type="text" name="" value="${form.message}">
        <button id="commit-message" type="button" name="button">保存</button>
        <button id="cancel-message" type="button" name="button">取消</button>
      </p>`
    });
    $messageElement.popover('show');
    // 给输入弹窗绑定事件
    $('#cancel-message').on("click", function(event){

      // 取消输入，弹窗消失
      $messageElement.popover('destroy');
      $popupElement.show();

    });
    $('#commit-message').on("click", function(event){
      // console.log('forms', forms);
      // console.log('form', form);
      // var form = getInformation(parameters)
      form.title = $('#message-title').val()
      form.message = $('#message-message').val()

      // console.log('forms', forms);
      console.log('form', form);
      // 因为都是 form 和 forms 都是指针，所以直接将 forms 保存到本地就好了
      localStorage.messages = JSON.stringify(forms)

      $messageElement.popover('destroy');

      $popupElement.show();

      $popupElement.popover('destroy');
      popup.setPosition(coordinate);

      $popupElement.popover({
        'placement': 'top',
        'animation': false,
        'html': true,
        'content': `
          <p>title: ${form.title}</p>
          <p>message: ${form.message}</p>
          <button data-id=${form.id} id="update-message" type="button" name="button">修改这个message</button>
          <button data-id=${form.id} id="delete-message" type="button" name="button">删除这个message</button>
        `
        // '<p>The location you clicked was:</p><code>' + coordinate + '</code>'
      });
      $popupElement.popover('show');

    });

  })

}


/**
 * onchange callback on the select element.
 */
changeInteraction('click');
