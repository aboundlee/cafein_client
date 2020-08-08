
import React from 'react';

import { gql } from 'apollo-boost';
import { useQuery, useMutation } from "react-apollo-hooks";


const TOGGLE_MARKER_STATUS = gql`
    mutation toggleMarkerStatus {
        toggleMarkerStatus @client 
    }
`;


const GET_MARKER_STATUS = gql`
    query getMarkerStatus {
        getMarkerStatus @client 
    }
`;

const Search = ({setButtonListener}) => {


    const [toggleMarkerStatus] = useMutation(TOGGLE_MARKER_STATUS);


		const {data, refetch, loading, error} = useQuery(GET_MARKER_STATUS);

		if (loading) {
			console.log(loading);
			return (<p>loading..</p>);
		}

		let markerStatus;
		if (data) {
				markerStatus = data.getMarkerStatus;

		}
    function handleClick(e) {
        const status = toggleMarkerStatus();
        setButtonListener(status);
    }
 
    return (
        					
					<div className="search_group">
                    <div className="map_controller"> 
                        <div className="marker_change_div">
													 { markerStatus ==="percent" && <a href="/#" className="marker_change_text"  onClick={handleClick}> </a> }
													 {  markerStatus === "text" && <a href="/#" className="marker_change_percent"  onClick={handleClick}> </a> }
                        </div>

                        <div className="gps_div">
                            <a href="/#" className="gps_btn"> </a>
                        </div>

                    </div>

                    <div className="line"> </div>
                    <div className="search_bar">
                        <button type="button" className="search_btn"> </button>
                        <div className="input_wrap">
                        <input type="text" className="search_input" placeholder="위치를 검색해주세요"></input>
                    </div>
                </div>
                        
            </div>
    )


};

export default Search;
