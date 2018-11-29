var gps = {
	scl:  { lat: -33.4488807, lng: -70.6692655 },
	ccp:  { lat: -36.8270169, lng: -73.0503189 },
	rapa: { lat: -27.1259593, lng: -109.3495764 }
}

var map;
var marker;

function initMap(coord = gps.scl) {
	map = new google.maps.Map(document.getElementById('map'), {
		center: coord,
		zoom: 9
	});
	marker = new google.maps.Marker({position: coord, map: map});
}

$(function(){

	var api_data = {
		cors: 'https://cors-anywhere.herokuapp.com/',
		url: 'https://api.darksky.net/forecast/',
		key: 'aa63eeb5090f84a53a598510890d6dce',
		queryParams: ['exclude=[minutely,hourly,daily,alerts,flags,apparentTemperature,precipProbability,humidity]', 'lang=es', 'units=auto']
	}

	var image = {
		'clear-day':'https://icons.wxug.com/i/c/v4/clear.svg',
		'clear-night':'https://icons.wxug.com/i/c/v4/clear.svg',
		'partly-cloudy-night':'https://icons.wxug.com/i/c/v4/partlycloudy.svg',
	};

	$('#select').on('change', function(){
		ajax_call(gps[$(this).val()])
	})

	function ajax_call(coord) {
		$.ajax({
			url: api_data.url + api_data.key + '/' + coord.lat + ',' + coord.lng + '?' + api_data.queryParams[0] + '&' + api_data.queryParams[1] + '&' + api_data.queryParams[2],
			method: 'GET',
			dataType: 'jsonp',
		})
		.done(function(data){
			console.log(data)
			$('#temperatura').text(parseInt(data.currently.temperature) + 'º ' + data.currently.summary);
			$('.img-responsive').attr('src', image[data.currently.icon]);

			initMap(coord);
		});
	}

}) //document.ready



