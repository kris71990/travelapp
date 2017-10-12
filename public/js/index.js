document.getElementById('convert-f').addEventListener('click', function() {
    var temperatureCelsius = document.getElementById('celsius').value;
    var conversion = ((temperatureCelsius * (9/5)) + 32).toFixed(1);
    var conversionInfo = document.getElementById('farenheit-conversion');
                                                    
    if (isNaN(temperatureCelsius)) {
        conversionInfo.innerHTML = '<p>Enter a number</p>';
    } else if (temperatureCelsius === "") {
    	conversionInfo.innerHTML = '<p>0 C is 32 F</p>';
    } else {
        conversionInfo.innerHTML = '<p>' + temperatureCelsius + ' C is ' + conversion + ' F' + '</p>';
    }
});


document.getElementById('convert-c').addEventListener('click', function() {
	var temperatureFarenheit = document.getElementById('farenheit').value;
	var conversion = ((temperatureFarenheit - 32) * (5/9)).toFixed(1);
	var conversionInfo = document.getElementById('celsius-conversion');

	if (isNaN(temperatureFarenheit)) {
		conversionInfo.innerHTML = '<p>Enter a number</p>';
	} else if (temperatureFarenheit === "") {
		conversionInfo.innerHTML = '<p>0 F is -17.8 C</p>';
	} else {
		conversionInfo.innerHTML = '<p>' + temperatureFarenheit + ' F is ' + conversion + ' C' + '</p>';
	}
});

document.getElementById('convert-ft').addEventListener('click', function() {
	var distMeters = document.getElementById('meters').value;
	var conversion = (distMeters * 3.28).toFixed(2);
	var conversionInfo = document.getElementById('feet-conversion');

	if (isNaN(distMeters)) {
		conversionInfo.innerHTML = '<p>Enter a number</p>';
	} else if (distMeters === "") {
		conversionInfo.innerHTML = '<p>1 m is 3.28 ft</p>';
	} else {
		conversionInfo.innerHTML = '<p>' + distMeters + ' m is ' + conversion + ' ft' + '</p>';
	}
});

document.getElementById('convert-m').addEventListener('click', function() {
	var distFeet = document.getElementById('feet').value;
	var conversion = (distFeet / 3.28).toFixed(2);
	var conversionInfo = document.getElementById('meters-conversion');

	if (isNaN(distFeet)) {
		conversionInfo.innerHTML = '<p>Enter a number</p>';
	} else if (distFeet === "") {
		conversionInfo.innerHTML = '<p>1 ft is 0.30 m</p>';
	} else {
		conversionInfo.innerHTML = '<p>' + distFeet + ' ft is ' + conversion + ' m' + '</p>';
	}
});

document.getElementById('convert-miles').addEventListener('click', function() {
	var distKm = document.getElementById('km').value;
	var conversion = (distKm * 0.621371).toFixed(2);
	var conversionInfo = document.getElementById('miles-conversion');

	if (isNaN(distKm)) {
		conversionInfo.innerHTML = '<p>Enter a number</p>';
	} else if (distKm === "") {
		conversionInfo.innerHTML = '<p>1 km is 0.621371 miles</p>';
	} else {
		conversionInfo.innerHTML = '<p>' + distKm + ' km is ' + conversion + ' m' + '</p>';
	}
});

document.getElementById('convert-km').addEventListener('click', function() {
	var distMiles = document.getElementById('miles').value;
	var conversion = (distMiles * 1.609344).toFixed(2);
	var conversionInfo = document.getElementById('km-conversion');

	if (isNaN(distMiles)) {
		conversionInfo.innerHTML = '<p>Enter a number</p>';
	} else if (distMiles === "") {
		conversionInfo.innerHTML = '<p>1 mile is 1.609344 km</p>';
	} else {
		conversionInfo.innerHTML = '<p>' + distMiles + ' m is ' + conversion + ' km' + '</p>';
	}
});
