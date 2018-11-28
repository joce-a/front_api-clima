var city = {
	scl: {lat: -33.4488807, lng: -70.6692655},
	ccp: {lat: -36.8270169, lng: -73.0503189},
	rapa: {lat: -27.1259593, lng: -109.3495764},
}

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: city.scl,
      zoom: 9
    });

    var marker = new google.maps.Marker({position: city.scl, map: map});
}

$(function(){

	var temp 	= $('#temperatura');
	var imagen 	= $('.img-responsive');

	var url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
	var key = 'aa63eeb5090f84a53a598510890d6dce';

	var gps = {
				scl: {lat: -33.4488807, lng: -70.6692655},
				ccp: {lat: -36.8270169, lng: -73.0503189},
				rapa: {lat: -27.1259593, lng: -109.3495764},
			  }

	var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags,apparentTemperature,precipProbability,humidity]', 'lang=es', 'units=auto'];

	var image = {
				  'clear-day':'https://icons.wxug.com/i/c/v4/clear.svg',
				  'clear-night':'https://icons.wxug.com/i/c/v4/clear.svg',
				  'partly-cloudy-night':'https://icons.wxug.com/i/c/v4/partlycloudy.svg',
				};

	//esta variable no me resulta
	var marker = gps[$(this).val()]

	$('#select').on('change', function(){
		ajax_call(gps[$(this).val()])
	})

	function ajax_call(coord) {
		$.ajax({
			url: url + key + '/' + coord.lat + ',' + coord.lng + '?' + queryParams [0],
			method: 'GET',
			dataType: 'json',
		}).done(function(data){
			temp.text(parseInt(data.currently.temperature) + 'º ' + data.currently.summary);
			imagen.attr('src', image[data.currently.icon]);

			google.maps.event.addListener(marker,'change',function() {
  				map.setZoom(9);
  				map.setCenter(marker.getPosition());
  				});
		});
	}	

}) //document.ready
