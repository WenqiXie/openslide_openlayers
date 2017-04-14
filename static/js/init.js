    // var center = ol.proj.transform([104.06667, 30.66667], 'EPSG:4326', 'EPSG:3857');
    // var center = [20100000, 20001000];
    // 这个坐标位置是 EPSG:3857 的坐标

    // 图片要放大，才能显示得看得见
    var imgSize = [46000*1000, 32914*1000]
    // var center = [imgSize[0]/2, -imgSize[1]/2]

    // 图片的地图坐标尺寸
    var mapSize = [183994.8, 131656.9]
    // 这个尺寸是 imgSize 的 1/250
    // 确定中心
    var center = [mapSize[0]/2, -mapSize[1]/2]
    // 确定边界
    var extent = [0, -mapSize[1], mapSize[0], 0];

    //创建地图
    var map = new ol.Map({
        // interactions: ol.interaction.defaults().extend([new app.Drag()]),
        controls: ol.control.defaults().extend([
                  // new ol.control.FullScreen(),
                  new ol.control.MousePosition(),
                  // new ol.control.OverviewMap(),
                  // new ol.control.ScaleLine(),
                  // new ol.control.ZoomSlider(),
                  // new ol.control.ZoomToExtent()
              ]),
        view: new ol.View({
            center: center,
            extent: extent,
            zoom: 9.5,
            minZoom:9,
            maxZoom:15
        }),
        target: 'map'
    });

    // 添加一个使用离线瓦片地图的层
    var offlineMapLayer = new ol.layer.Tile({
        source: new ol.source.Zoomify({
          size: imgSize,
          // 设置本地离线瓦片所在路径，由于例子里面只有一张瓦片，页面显示时就只看得到一张瓦片。
          url: 'images/c/CMU-1_files/{z}/{x}_{y}.jpeg',
        })
    });

    map.addLayer(offlineMapLayer);


// url: 'images/CMU-1_files/{z}/{x}_{y}.jpeg',
var e = function(s) {
  return document.querySelector(s)
}
