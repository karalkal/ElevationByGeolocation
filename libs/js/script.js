$(window).on('load', function () {
	if ($('#preloader').length) {
		('#preloader').delay(1000).fadeOut('slow', function () {
			$(this).remove();
		});
	}
});


$('#getElevationData').click(function () {
	$.ajax({
		url: "libs/php/getElevationData.php",
		type: 'POST',
		dataType: 'json',		// will send request to JSON endpoint anyway but can manipulate here if different format is available/required
		data: {
			lat: Number($('#lat').val()),
			lng: Number($('#lng').val())
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