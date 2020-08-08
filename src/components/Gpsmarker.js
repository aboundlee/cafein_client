import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-naver-maps'; // 패키지 불러오기
import './marker.css';


const CustomMarker = () => {
	const navermaps = window.naver.maps;

	return (
		{
        content:[ 
					 	'<div class="gps_div">',
							'<img src="/images/ui/GPS.svg" class="pulse" alt="pos">',
						'</div>'].join(''),

        size: new navermaps.Size(30, 30),
        anchor: new navermaps.Point(15, 30)
    }
	)
}

const GpsMarker= ({lat, lng}) => {
	return (  
		<Marker
			position={{ lat: lat, lng: lng }}
			icon={CustomMarker()}
		/>
	)
}


GpsMarker.propTypes = {
	lat: PropTypes.number.isRequired,
	lng: PropTypes.number.isRequired,
}

export default GpsMarker;
