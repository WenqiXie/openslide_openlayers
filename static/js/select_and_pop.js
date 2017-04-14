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
  if (id == undefined || id == '') {
    // 如果 id 不存在，则需要输入 id
    requestMessage(selectedF, coordinate)
  } else {
    // 如果 id 存在，则弹出给定内容
    var forms = JSON.parse(localStorage.messages)
    var form = forms[id]
    // displayMessage(id)
    // console.log('selectedF geometry getProperties', coordinates);
    // console.log('selectedF geometry getLayout', geometry.getLayout());
    $(popupElement).popover('destroy');
    popup.setPosition(coordinate);
    // the keys are quoted to prevent renaming in ADVANCED mode.
    $(popupElement).popover({
      'placement': 'top',
      'animation': false,
      'html': true,
      'content': `
        <p>id: ${form.id}</p>
        <p>message: ${form.message}</p>
        <button data-id=${form.id} id="update-message" type="button" name="button">修改这个message</button>
        <button data-id=${form.id} id="delete-message" type="button" name="button">删除这个message</button>
      `
      // '<p>The location you clicked was:</p><code>' + coordinate + '</code>'
    });
    $(popupElement).popover('show');
    $('#delete-message').one('click', function(e) {
      console.log('删除这个message');
      let target = e.target
      let targetId = target.dataset.id
      // console.log('targetId', targetId);
      // console.log('selectedF', selectedF);
      // 从界面删除
      featuresSource.removeFeature(selectedF)

      // 从数据库隐藏
      console.log('form', form);
      form.available = false
      console.log('form', form);
      console.log('forms', forms);
      localStorage.messages = JSON.stringify(forms)

    })

    $('#update-message').one('click', function(e) {
      console.log('修改这个message');
      let target = e.target
      let targetId = target.dataset.id
      // console.log('targetId', targetId);
      // console.log('selectedF', selectedF);
      // 弹出请求框
      requestMessage(selectedF, coordinate)

      console.log('form', form);
      $('#message-id').val(form.id)
      $('#message-message').val(form.message)


      console.log('forms', forms);
      localStorage.messages = JSON.stringify(forms)


    })

  }
}



/**
 * onchange callback on the select element.
 */
changeInteraction('click');
