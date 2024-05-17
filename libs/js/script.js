$(window).on('load', function () {
	if ($('#preloader').length) {
		('#preloader').delay(1000).fadeOut('slow', function () {
			$(this).remove();
		});
	}
});


$('#getElevationDataForm').submit(function (e) {
	e.preventDefault();
	let inputLat = $('#lat').val();
	let inputLng = $('#lng').val();
	// no empty inputs
	if (inputLat === "" || inputLng === "") {
		alert("empty coordinate field(s)");
		return;
	}
	let numLat = Number(inputLat);
	let numLng = Number(inputLng);
	// no non-numeric
	if (isNaN(numLat) || isNaN(numLng)) {
		alert("non-numeric value(s)");
		return;
	}
	// no out of range
	if (numLat < -90 || numLat > 90 || numLng < -180 || numLng > 180) {
		console.log(-90 < numLat, numLat > 90, -180 < numLng, numLng > 180);
		alert("invalid coordinates");
		return;
	}

	$.ajax({
		url: "libs/php/getElevationData.php",
		type: 'GET',
		dataType: 'json',		// will send request to JSON endpoint anyway but can set different format if one is available/required
		data: {
			lat: numLat,
			lng: numLng
		},

		success: function (result) {
			console.log(result);

			if (result.status.name == "ok") {
				console.log(result['data']['srtm1']);
				if (result['data']['srtm1'] === -32768) {
					$('#srtm1Result')
						.html(`Point with 
					<br/>latitude ${result['data']['lat']} and 
					<br/>longitude ${result['data']['lng']} 
					<br/>seems to be 
					<br/><span>in the ocean</span>`);
				}
				else {
					$('#srtm1Result')
						.html(`Elevation 
						<br/>for point with 
						<br/>latitude ${result['data']['lat']} and 
						<br/>longitude ${result['data']['lng']} is 
						<br/><span>${result['data']['srtm1']} m</span>`);
				}
			}
		},

		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		}
	});

});