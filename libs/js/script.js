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
		dataType: 'json',		// will send request to JSON endpoint anyway but can manipulate here if different format is available/required
		data: {
			lat: numLat,
			lng: numLng
		},
		success: function (result) {
			console.log(result);

			console.log(JSON.stringify(result));

			if (result.status.name == "ok") {

				$('#srtm1Result').html(result['data'][0]['srtm1']);
				// $('#txtCapital').html(result['data'][0]['capital']);
				// $('#txtLanguages').html(result['data'][0]['languages']);
				// $('#txtPopulation').html(result['data'][0]['population']);
				// $('#txtArea').html(result['data'][0]['areaInSqKm']);

			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		}
	});

});