import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-naver-maps'; // 패키지 불러오기
import './marker.css';


const CustomMarker = (marker_div, busyPercent, name, busyText, franchiseIcon,markerStatus) => {
	const navermaps = window.naver.maps;
    let percent = '<span class="percent">%</span>';
    
    
    let content;
    if (busyPercent===null)
        percent = null;


    if (markerStatus==="percent") {
        
         content = ['<p class="busy_percent">',
                    busyPercent,
                    percent].join('');



    }

    else if (markerStatus==="text") {
         content = ['<p class="busy_text">',
                        busyText].join('');

    }

    return (
        {
        content:[ 
                        marker_div,
                            '<div class="franchise_icon">',
                                franchiseIcon,
                            '</div>',
                            '<div class="icon_div">',
                               content,
                                '</p>',
                            '</div>',
                        '</div>'].join(''),

        size: new navermaps.Size(48, 48),
        anchor: new navermaps.Point(11, 35)
        }
    )

    
    //     return (
    //         {
    //         content:[ 
    //                         marker_div,
    //                             '<div class="franchise_icon">',
    //                                 franchiseIcon,
    //                             '</div>',
    //                             '<div class="icon_div">',
    //                                 '<p class="busy_percent">',
    //                                 busyPercent,
    //                                 percent,
    //                                 '</p>',
    //                             '</div>',
    //                         '</div>'].join(''),

    //         size: new navermaps.Size(48, 48),
    //         anchor: new navermaps.Point(11, 35)
    //         }
    //     )
    

    //     return (
    //         {
    //         content:[ 
    //                         marker_div,
    //                             '<div class="franchise_icon">',
    //                                 franchiseIcon,
    //                             '</div>',
    //                             '<div class="icon_div">',
    //                                 '<p class="busy_text">',
    //                                 busyText,
    //                                 '</p>',
    //                             '</div>',
    //                         '</div>'].join(''),

    //         size: new navermaps.Size(48, 48),
    //         anchor: new navermaps.Point(11, 35)
    //         }
    //     )

    // }
       

}
/*
const CustomMarker = (marker_div,busy, name, icon_img) => {
	const navermaps = window.naver.maps;

	return (
		{
        content:[ 
						marker_div,
					 		'<div class="icon_div">',
								icon_img,
							'</div>',
							'<div class="busy">',
								parseInt(busy),
							'<div>',
						'</div>'].join(''),

        size: new navermaps.Size(48, 48),
        anchor: new navermaps.Point(11, 35)
    }
	)
}
*/

const CafeMarker = ({lat, lng, busy, busy_color, cafe_name, markerStatus}) => {
	let title, marker_div, franchiseIcon='', iconImgArray, rand_index, busyText='';

	iconImgArray = [ '<img src="/images/marker/HollysCoffee.svg" class="franchise_img" alt="cafe">', '<img src="/images/marker/Starbucks.svg" class="franchise_img" alt="cafe">', '<img src="/images/marker/TomNToms.svg" class="franchise_img" alt="cafe">'];
	rand_index = parseInt(busy) % 3 ;
	marker_div = '<div class="map_marker_div';
	franchiseIcon =iconImgArray[rand_index];
	if (busy_color==='red') {
		title = 'red_marker';
		marker_div = marker_div + ' busy_red">';
		busyText = "많음";
	}
	else if (busy_color==='yellow') {
		title = 'yellow_marker';
		marker_div = marker_div + ' busy_yellow">';
		busyText = "보통";
	}
	else if (busy_color==='green') {
		title = 'green_marker';
		marker_div = marker_div + ' busy_green">';
		busyText = "적음";
	}

	else if (busy_color==='grey') {
		title = 'grey_marker';
		marker_div = marker_div + ' busy_grey">';

    }
    
    let busyPercent = parseInt(busy);
    if (busyPercent === -1)
        busyPercent = null;
	
	return (  
		<Marker
			position={{ lat: lat, lng: lng }}
			icon={CustomMarker(marker_div, busyPercent, cafe_name, busyText, franchiseIcon, markerStatus)}
			title= {title}
		/>
	)
}


CafeMarker.propTypes = {
	lat: PropTypes.number.isRequired,
	lng: PropTypes.number.isRequired,
	busy: PropTypes.string.isRequired,
	busy_color: PropTypes.string.isRequired,
	cafe_name: PropTypes.string.isRequired
}

export default CafeMarker;
