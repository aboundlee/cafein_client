
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


const ChairEmptysvg = () => {
    return (
        <svg  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="7.75" stroke="#0047FF" stroke-width="0.5"/>
        <path d="M4.5 9.26353H9.33545L10.984 3" stroke="#0047FF" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.25871 9.26364L5.06299 13" stroke="#0047FF" stroke-miterlimit="10"/>
        <path d="M9.39648 9.26364L10.5922 13" stroke="#0047FF" stroke-miterlimit="10"/>
        <path d="M5.66003 11.1325H9.99515" stroke="#0047FF" stroke-miterlimit="10"/>
        </svg>
    )
}
const ConcentEmptysvg = () => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
            <path d="M8.14302 11.6063C6.161 11.6063 4.5542 9.99878 4.5542 8.01642V6.16061H11.7329V8.01642C11.7329 9.99869 10.1262 11.6063 8.14302 11.6063Z" fill="white" stroke="#0047FF" stroke-miterlimit="10"/>
            <path d="M5.99951 5.66057V2.5" stroke="#0047FF" stroke-miterlimit="10"/>
            <path d="M10.2876 5.66057V2.5" stroke="#0047FF" stroke-miterlimit="10"/>
            <path d="M8.14307 12.1064V14.5001" stroke="#0047FF" stroke-miterlimit="10"/>
            </g>
            <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="7.75" stroke="#0047FF" stroke-width="0.5"/>
            <defs>
            <clipPath id="clip0">
            <rect width="8.28703" height="12" fill="white" transform="translate(4 2.5)"/>
            </clipPath>
            </defs>
        </svg>
    )
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
        					
            <div className={`search_group`} >
                { !isfull &&
                
                < div className={`map_controller`}> 

                <div className={`marker_change_div`}>
                                                { markerStatus ==="percent" && <a href="/#" className="marker_change_text"  onClick={handleClick}> </a> }
                                                {  markerStatus === "text" && <a href="/#" className="marker_change_percent"  onClick={handleClick}> </a> }
                </div>

                <div className="gps_div">
                    <a href="/#" className="gps_btn"> </a>
                </div>

            </div>
                }
                

                {!isfull &&
                    <>
                    <div className="color_line" />
                    <div className="line" />
                    </>
                }
                
                {
                setShow ? (
                    
                        
                        <div className={`detail_div${isfull ? '-active' : ''}`} ref={wrapperRef}>

                            {!isfull ? 

                            <div className="cafe_info">
                                <div className="cafe_title">
                                    <div className="cafe_name">{selectedStore.cafe_name}</div>
                                    <div className="cafe_grade"><p>4.0</p></div>
                                </div>

                                <div className="cafe_type">프랜차이즈</div>
                                
                                <div className="cafe_confusion">

                                    <p>혼잡도</p>

                                    <div className="progress"><div className="progress_bar"/></div><span>50%</span>
                                    
                                </div>

                                <div className="cafe_size">

                                    <p>카페 규모</p>

                                    <div>
                                            <svg  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="7.75" stroke="#0047FF" strokeWidth="0.5"/>
                                            <path d="M4.5 9.26353H9.33545L10.984 3" stroke="#0047FF" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M6.25871 9.26364L5.06299 13" stroke="#0047FF" strokeMiterlimit="10"/>
                                            <path d="M9.39648 9.26364L10.5922 13" stroke="#0047FF" strokeMiterlimit="10"/>
                                            <path d="M5.66003 11.1325H9.99515" stroke="#0047FF" strokeMiterlimit="10"/>
                                            </svg>
                                    </div>

                                    <span className="cafe_chair">{10}개 테이블, {4}개 좌석 보유 </span>
                                    
                                    <div>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0)">
                                            <path d="M8.14302 11.6063C6.161 11.6063 4.5542 9.99878 4.5542 8.01642V6.16061H11.7329V8.01642C11.7329 9.99869 10.1262 11.6063 8.14302 11.6063Z" fill="white" stroke="#0047FF" stroke-miterlimit="10"/>
                                            <path d="M5.99951 5.66057V2.5" stroke="#0047FF" strokeMiterlimit="10"/>
                                            <path d="M10.2876 5.66057V2.5" stroke="#0047FF" strokeMiterlimit="10"/>
                                            <path d="M8.14307 12.1064V14.5001" stroke="#0047FF" strokeMiterlimit="10"/>
                                            </g>
                                            <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="7.75" stroke="#0047FF" stroke-width="0.5"/>
                                            <defs>
                                            <clipPath id="clip0">
                                            <rect width="8.28703" height="12" fill="white" transform="translate(4 2.5)"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                    </div>

                                    <span className="cafe_concent">{20}구 콘센트 보유</span>

                                </div>

                                <div className="cafe_line" />

                                <div className="cafe_detail">

                                    <div className="cafe_address"> 서울특별시 서대문구 신촌동 신촌로 73</div>

                                    <div className="cafe_hour"><span>매일 10:00-22:00</span><span>현재 영업중</span></div>

                                    <div className="cafe_find">
                                    
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="16" cy="16" r="16" fill="#0047FF"/>
                                            <path d="M25 14L19 8L17.58 9.42L21.17 13H10V25H12V15H21.17L17.58 18.58L19 20L25 14Z" fill="white"/>
                                        </svg>
                                    </div>

                                </div>


                            </div>

                            :


                            <div className="cafe_info-active">

                                <div className="cafe_title-active">
                                

                                    <div className="close_button" onClick={() => {onCafeClose(); setIsfull(false)}}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 11H6.83L10.41 7.41L9 6L3 12L9 18L10.41 16.59L6.83 13H21V11Z" fill="black"/>
                                        </svg>
                                    </div>
                                    <p className="cafe_name-active">{selectedStore.cafe_name}</p>
                                    <p className="cafe_type-active">프랜차이즈</p>
                                    <div className="cafe_grade-active"><p>4.0</p></div>
                                </div>

                                <div className="cafe_line_top-active" />
                                
                                
                                <div className="cafe_confusion-active">

                                    <p>사람 많니?</p>

                                    <div className="progress-active"><div className="progress_bar-active"/></div><span>50%</span>
                                    
                                </div>

                                <div className="cafe_size-active">

                                    <p>좌석 많니?</p>

                                    <div>
                                        <ChairEmptysvg />
                                    </div>
                                    <div>
                                        <ChairEmptysvg />
                                    </div>
                                    <div>
                                        <ChairEmptysvg />
                                    </div>


                                    <span className="cafe_chair-active">10개 테이블, 40개 좌석 보유 </span>

                                 </div>

                                <div className="cafe_size-active">

                                    <p>돼지코 많니?</p>

                                    <div>
                                        <ConcentEmptysvg />
                                    </div>
                                    <div>
                                        <ConcentEmptysvg />
                                    </div>
                                    <div>
                                        <ConcentEmptysvg />
                                    </div>

                                    <span className="cafe_concent-active">30구 콘센트 보유</span>
                                </div>

                                <div className="cafe_atmosphere-active">

                                    <p>분위기 어떠니?</p>
                                    <div className="atmosphere_tag">
                                        <span>#공부하기 좋은</span> <span>#조용한</span>
                                    </div>
                                    

                                    <div className="cafe_imgage-active"/>
                                    <div className="cafe_imgage-active"/>
                                    <div className="cafe_imgage-active"/>
                                    <div className="cafe_imgage-active"/>

                                    
                                </div>

                                <div className="cafe_menu-active">

                                    <p>뭐 먹을래?</p>

                                    <p>메뉴</p>

                                    <div>코코넛 화이트 콜드 브루</div>
                                    <div>블랙 와플칩 크림 프라푸치노</div>
                                    <div>블랙 와플칩 크림 프라푸치노</div>
                                    <div>블랙 와플칩 크림 프라푸치노</div>
                                    <div>블랙 와플칩 크림 프라푸치노</div>
                                    
                                </div>



                                <div className="cafe_line-active" />

                                <div className="cafe_detail-active">

                                    <div className="cafe_address-active"> 서울특별시 서대문구 신촌동 신촌로 73</div>

                                    <div className="cafe_hour-active"><span>매일 10:00-22:00</span><span>현재 영업중</span></div>

                                    <div className="cafe_find-active">
                                    
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="16" cy="16" r="16" fill="#0047FF"/>
                                            <path d="M25 14L19 8L17.58 9.42L21.17 13H10V25H12V15H21.17L17.58 18.58L19 20L25 14Z" fill="white"/>
                                        </svg>
                                    </div>

                                </div>

                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>

                                
                            </div>
                            
                            }


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
