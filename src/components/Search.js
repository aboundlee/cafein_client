
import React, { useState, useEffect, useRef } from 'react';

import { gql } from 'apollo-boost';
import { useQuery, useMutation } from "react-apollo-hooks";
import AnimateHeight from 'react-animate-height';

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

function useOutsideAlerter(ref, onCafeClose, setIsfull) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsfull(false);
                onCafeClose();
            } else if(ref.current && ref.current.contains(event.target)) {
                console.log("happy");
                setIsfull(true);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


const Search = ({setButtonListener, setShow, onCafeClose, selectedStore}) => {

    const [height, setHeight] = useState(300);
    const [isfull, setIsfull] = useState(false);
    


    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, onCafeClose, setIsfull);

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
        setHeight(100);
    }
    return (
        					
            <div className="search_group" >

               < div className="map_controller"> 

                    <div className="marker_change_div">
                                                    { markerStatus ==="percent" && <a href="/#" className="marker_change_text"  onClick={handleClick}> </a> }
                                                    {  markerStatus === "text" && <a href="/#" className="marker_change_percent"  onClick={handleClick}> </a> }
                    </div>

                    <div className="gps_div">
                        <a href="/#" className="gps_btn"> </a>
                    </div>

                </div>

                <div className="line"> </div>
                {
                setShow ? (
                    
                        
                        <div className={`detail_div${isfull ? '-active' : ''}`} ref={wrapperRef}>
                            <div className="cafe_name">

                            </div>
                            <div className="cafe_info">

                            </div>
                            <div className="cafe_image">

                            </div>
                            cafe name: {selectedStore.cafe_name}<br/>
                            lat : {selectedStore.lat}<br/>
                            lng : {selectedStore.lng}<br/>
                            df<br/>
                            df<br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>

                ) : ( 
                    <div className="search_bar">
                        <button type="button" className="search_btn"> </button>
                        <div className="input_wrap">
                            <input type="text" className="search_input" placeholder="위치를 검색해주세요"></input>
                        </div>
                    </div>
                )}
                    
                        
            </div>
    )

};

export default Search;
