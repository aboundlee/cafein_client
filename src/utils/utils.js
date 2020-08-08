

export const getCurrentLocation = async () => {
	return new Promise(resolve => {
		if (navigator.geolocation) { // GPS를 지원하면
			navigator.geolocation.getCurrentPosition(function(position) {
				console.log(position.coords.latitude + ' ' + position.coords.longitude);
				resolve({lat: position.coords.latitude, lng: position.coords.longitude});
			}, function(error) {
				// console.error(error);
				resolve({lat: 37.5668144, lng: 126.9783882});
				
			}, {
				enableHighAccuracy: false,
				maximumAge: 0,
				timeout: Infinity
			});
		} else {
			console.log('GPS를 지원하지 않습니다');
			resolve({lat: 37.5668144, lng: 126.9783882});
		}
	});
}
