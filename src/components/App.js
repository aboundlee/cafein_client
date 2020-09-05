import React, {useState, useEffect} from 'react';
import '../App.css';
import Map from './Map'; 
import { RenderAfterNavermapsLoaded} from 'react-naver-maps'; // 패키지 불러오기
import { getCurrentLocation } from '../utils/utils';
import dotenv from 'dotenv';

import Search from './Search';

import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";


//dotenv.config({ path: path.join(__dirname,'/.env') });
dotenv.config();


const GET_MARKER_STATUS = gql`
    query getMarkerStatus {
        getMarkerStatus @client 
    }
`;


const App = () => {

	
		//console.log('i am rendering');
        const [buttonListener, setButtonListener] = useState(0);

        const {data, refetch, loading, error} = useQuery(GET_MARKER_STATUS);
        let markerStatus; 

		const [show, setShow] = useState(false);
		const [selectedStore, setSelectedStore] = useState({});

		const handleShow = () => setShow(true);
		const handleClose = () => setShow(false);

		const onCafeClick = (store) => {
			setSelectedStore(store);
			handleShow();
			
		};


        useEffect(() => {
            refetch();
        },[buttonListener]);
    
		if (loading) {
			console.log(loading);
			return (<p>loading..</p>);
		}

        if (data) {
            markerStatus = data.getMarkerStatus;
        }


    



		return (
			<RenderAfterNavermapsLoaded
				// ncpClientId={process.env.REACT_APP_NAVERMAP_CLIENT_KEY} // 자신의 네이버 계정에서 발급받은 Client ID
				ncpClientId={"xh3x53ga8k"} // 자신의 네이버 계정에서 발급받은 Client ID
				error={<p>Maps Load Error</p>}
				loading={<p>Maps Loading...</p>}
			>
				<div id="container">
					<div className="menu_div">
						<img src="/images/ui/menu/hamburger.svg" className="menu_hamburger" alt="menu"></img>
						<img src="/images/ui/menu/activate.svg" className="menu_activate" alt="menu"></img>
					</div>

				<Map markerStatus={markerStatus} onCafeClick={ onCafeClick } />
				
                <Search setButtonListener={setButtonListener} setShow={show} onCafeClose={handleClose} selectedStore={selectedStore}/>

				</div>
			</RenderAfterNavermapsLoaded>
		);

}

export default App;
