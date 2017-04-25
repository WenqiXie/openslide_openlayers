var features = new ol.Collection();
// var featuresRed = new ol.Collection();
// var featuresOrange = new ol.Collection();
// var featuresGreen = new ol.Collection();
// var featuresBlue = new ol.Collection();
// var featuresPurple = new ol.Collection();

var featuresSource = new ol.source.Vector({features: features})
// var featuresSourceRed = new ol.source.Vector({features: featuresRed})
// var featuresSourceOrange = new ol.source.Vector({features: featuresOrange})
// var featuresSourceGreen = new ol.source.Vector({features: featuresGreen})
// var featuresSourceBlue = new ol.source.Vector({features: featuresBlue})
// var featuresSourcePurple = new ol.source.Vector({features: featuresPurple})

// console.log('features', features);
var overlayStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.1)',
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
var featureOverlay = new ol.layer.Vector({
  source: featuresSource,
  style: overlayStyle
});
featureOverlay.setMap(map)

// default style
// select and pop 里面的 select 的样式引用了
var fill = new ol.style.Fill({
  color: 'rgba(255,255,255,0.5)'
});
var stroke = new ol.style.Stroke({
  color: '#3399CC',
  width: 3
});
var styles = [
  new ol.style.Style({
    image: new ol.style.Circle({
      fill: fill,
      stroke: stroke,
      radius: 5
    }),
    fill: fill,
    stroke: stroke,
  })
];


// var overlayStyleRed = new ol.style.Style({
//   fill: new ol.style.Fill({
//     color: 'rgba(255, 255, 255, 0.1)',
//     // 白色 透明度 0.2
//   }),
//   stroke: new ol.style.Stroke({
//     color: '#f8691c',
//     // 黄色
//     width: 2
//   }),
//   image: new ol.style.Circle({
//     radius: 7,
//     // 半径 7
//     fill: new ol.style.Fill({
//       color: '#ffcc33'
//     })
//   })
// })
// var featureOverlayRed = new ol.layer.Vector({
//   source: featuresSourceRed,
//   style: overlayStyleRed
// });
// featureOverlayRed.setMap(map)
//
// var overlayStyleOrange = new ol.style.Style({
//   fill: new ol.style.Fill({
//     color: 'rgba(255, 255, 255, 0.1)',
//     // 白色 透明度 0.2
//   }),
//   stroke: new ol.style.Stroke({
//     color: '#f6a623',
//     // 黄色
//     width: 2
//   }),
//   image: new ol.style.Circle({
//     radius: 7,
//     // 半径 7
//     fill: new ol.style.Fill({
//       color: '#ffcc33'
//     })
//   })
// })
// var featureOverlayOrange = new ol.layer.Vector({
//   source: featuresSourceOrange,
//   style: overlayStyleOrange
// });
// featureOverlayOrange.setMap(map)
//
// var overlayStyleGreen = new ol.style.Style({
//   fill: new ol.style.Fill({
//     color: 'rgba(255, 255, 255, 0.1)',
//     // 白色 透明度 0.2
//   }),
//   stroke: new ol.style.Stroke({
//     color: '#50e3c2',
//     // 黄色
//     width: 2
//   }),
//   image: new ol.style.Circle({
//     radius: 7,
//     // 半径 7
//     fill: new ol.style.Fill({
//       color: '#ffcc33'
//     })
//   })
// })
// var featureOverlayGreen = new ol.layer.Vector({
//   source: featuresSourceGreen,
//   style: overlayStyleGreen
// });
// featureOverlayGreen.setMap(map)
//
// var overlayStyleBlue = new ol.style.Style({
//   fill: new ol.style.Fill({
//     color: 'rgba(255, 255, 255, 0.1)',
//     // 白色 透明度 0.2
//   }),
//   stroke: new ol.style.Stroke({
//     color: '#4990e2',
//     // 黄色
//     width: 2
//   }),
//   image: new ol.style.Circle({
//     radius: 7,
//     // 半径 7
//     fill: new ol.style.Fill({
//       color: '#ffcc33'
//     })
//   })
// })
// var featureOverlayBlue = new ol.layer.Vector({
//   source: featuresSourceBlue,
//   style: overlayStyleBlue
// });
// featureOverlayBlue.setMap(map)
//
// var overlayStylePurple = new ol.style.Style({
//   fill: new ol.style.Fill({
//     color: 'rgba(255, 255, 255, 0.1)',
//     // 白色 透明度 0.2
//   }),
//   stroke: new ol.style.Stroke({
//     color: '#9012fe',
//     // 黄色
//     width: 2
//   }),
//   image: new ol.style.Circle({
//     radius: 7,
//     // 半径 7
//     fill: new ol.style.Fill({
//       color: '#ffcc33'
//     })
//   })
// })
// var featureOverlayPurple = new ol.layer.Vector({
//   source: featuresSourcePurple,
//   style: overlayStylePurple
// });
// featureOverlayPurple.setMap(map)
