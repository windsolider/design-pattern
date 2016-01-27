var googleMap = {

	show: function() {
		consoe.log('render');
	}
};
var baiduMap = {

	display: function() {
		console.log('render');
	}
};
var baiduMapAdapter = {

	show: function() {
		return baiduMap.display();
	}
};

var mapType = {
	'googleMap': googleMap,
	'baiduMap': baiduMapAdapter
};
renderMap(mapType['googleMap']);
renderMap(mapType['baiduMap']);


