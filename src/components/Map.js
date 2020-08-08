import React, { useState, useEffect } from 'react';
import './Map.css';
import axios from 'axios';
import { NaverMap } from 'react-naver-maps'; // 패키지 불러오기
import CafeMarker from './Cafemarker';
import GpsMarker from './Gpsmarker';
import { getCurrentLocation } from './../utils/utils';




const useAxios = (url) => {
	const [state, setState] = useState({
		data: null,
		loading: true,
		error: null
	});

	const [trigger, setTrigger] = useState(0);

	const refetch = () => { 
		setState({
			loading: true
		});
		setTrigger(Date.now());
	};

	const getData = async () => {
		const result = await axios.post(url);
		setState({
			data: result.data,
			loading: false,
			error: null
		});
		if (result.error) {
			setState({data:result.data, loading:false, error:result.error});
		}
	};

	useEffect(() => { getData(); }, [trigger]);
	if (!url) {
		return;
	}
	return {state, refetch};
};



/*
const watchPosition = () => {
  if (navigator.geolocation) {
		const watchId = navigator.geolocation.watchPosition(function(position) {
			console.log(position.coords);
			setUserPos(position.coords);
		});
  } 
}
*/



const Map = ({markerStatus}) => {
	const { state, refetch } = useAxios("http://15.164.231.216:3001/getcafes");
	const {data, error} = state;
	// const {data: {getMarkerStatus: markerStatus}} = useQuery(GET_MARKER_STATUS);


    

	//getCurrentLocation();
	let mapRef;
	
	
	let [mapBounds, setBounds] = useState(0); // 맵 전체 크기  
	let [center, setCenter] = useState({lat:37.5668144, lng:126.9783882}); // 지도의 center 값
	let [zoom, setZoom] = useState(0); // 지도의 zoom 값
	let [posChanged, setPosChanged] = useState(0); // 지도 position 변화 감지.
	let [userPos, setUserPos] = useState(0); // user GPS Position 


	// Get GPS Position data 
	useEffect(() => {
  	async function getPosData() {
			const cur_pos = await getCurrentLocation();
			if (cur_pos) {
				setCenter(cur_pos);
				setUserPos(cur_pos);
			}
  	}
		getPosData();
	}, [posChanged]);


	// Get Map Center data
	useEffect(() => { 
		setBounds(mapRef.getBounds());
	 }, [center]);



	const cafes = data;
	let render_cafes = [];

	if (cafes) { 
  	let d = new Date();
    let day_of_week = d.getDay(); // sunday : 0, mon : 1, ...
    let cur_hour = d.getHours();
		for (let i = 0; i < cafes.length; i ++) {
			// 마커 이미지를 생성합니다

			const regex = /[\[\]]/;
			let arr = cafes[i].busy.split(regex);
			let filtered = arr.filter(function (el) {
				return el !== "" && el !== ", ";
			});

			let cur_busy = filtered[day_of_week].split(', ')[cur_hour];

			let cur_busy_color; 
			if (cur_busy >= 80) {
			// red (Busy : 80-100)
				cur_busy_color = "red"; 
			} else if (cur_busy >= 40) {
			// yellow (Busy : 40-59)
				cur_busy_color = "yellow"; 
			} else if (cur_busy >= 0) {
			// green (Busy : 0-39)
				cur_busy_color = "green"; 
			} else if (cur_busy === '-1.0') {
			// grey (Busy : not_opened)
				cur_busy_color = "grey"; 
			} else {
			//예외처리
				console.log("it is wrong busy data");
				continue;
			}
			cafes[i]['cur_busy_color'] = cur_busy_color;
			cafes[i]['cur_busy'] = cur_busy.toString();
			
 			const navermaps = window.naver.maps; // 혹은 withNavermaps hoc을 사용

			// mapBounds 안에 있는 marker만 render 하도록 
			if (mapBounds && mapBounds.hasLatLng(navermaps.LatLng(cafes[i].lat,cafes[i].lon))){
				render_cafes.push(cafes[i]);
			}
		}
	}

 	//const latlng = new navermaps.LatLng(37.3595704, 127.105399)
	//		<button onClick={refetch}>Refetch</button> 
	//		<h2>{loading && "Loading" }</h2>
 	return (
		<div className="map_container">
			<NaverMap
				mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
				naverRef={ref => { mapRef = ref}}
				style={{
					width: '100%', // 네이버지도 가로 길이
					height: '100%' // 네이버지도 세로 길이
				}}
				defaultCenter={{lat: 37.5668144, lng: 126.9783882}} // 지도 초기 위치
				center={center}
				defaultZoom={16} // 지도 초기 확대 배율
				onCenterChanged={center_pos => { setCenter(center_pos) }}
				onZoomChanged={zoomListener => { setZoom(zoomListener) }}
			>
				{ render_cafes  && render_cafes.map((cafe, index) => (
					<CafeMarker lat={cafe.lat} lng={cafe.lon} busy={cafe.cur_busy} busy_color={cafe.cur_busy_color} cafe_name={cafe.name} key={index} markerStatus={markerStatus}/>
				))}

				{ userPos && <GpsMarker lat={userPos.lat} lng={userPos.lng} key='1'/> }
		
			</NaverMap>
		</div>
	);
}

export default Map;
