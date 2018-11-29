var gps = {
			scl:  { lat: -33.4488807, lng: -70.6692655 },
			ccp:  { lat: -36.8270169, lng: -73.0503189 },
			rapa: { lat: -27.1259593, lng: -109.3495764 }
		  }

var map;
var marker;

function initMap() {
   	map = new google.maps.Map(document.getElementById('map'), {
      	  center: gps.scl,
      	  zoom: 9
          });

    marker = new google.maps.Marker({position: gps.scl, map: map});
	}

$(function(){

	var temp 	= $('#temperatura');
	var imagen 	= $('.img-responsive');

	var url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
	var key = 'aa63eeb5090f84a53a598510890d6dce';

	var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags,apparentTemperature,precipProbability,humidity]', 'lang=es', 'units=auto'];

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
			url: url + key + '/' + coord.lat + ',' + coord.lng + '?' + queryParams [0] + '&' + queryParams [1] + '&' + queryParams [2],
			method: 'GET',
			dataType: 'json',
		})
		.done(function(data){
			temp.text(parseInt(data.currently.temperature) + 'º ' + data.currently.summary);
			imagen.attr('src', image[data.currently.icon]);
			map.setCenter(coord);
			marker = new google.maps.Marker({
				position: (coord),
				map: map
  				});			
		});
	}	
}) //document.ready
