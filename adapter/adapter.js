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


//data adapter
var getGuangdongCity = function() {
	var guangdongCity = [
			{name: 'shenzhen', id: 11},
			{name: 'guangzhow', id: 12}
		];
	return guangdongCity;
};

var render = function(fn) {
	console.log(JSON.stringify(fn()));
};

var addressAdapter = function(oldAddressfn) {
	var address = {};
	var oldAddress = oldAddressfn();
	for (var i = 0, c; c = oldAddress[i++];) {
		address[c.name] = c.id;
	}
	return function() {
		return address;
	}
};

render(addressAdapter(getGuangdongCity));

