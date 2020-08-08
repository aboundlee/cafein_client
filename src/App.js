import React from 'react';
import './App.css';
import Map from './components/Map'; 
import { RenderAfterNavermapsLoaded} from 'react-naver-maps'; // 패키지 불러오기
import { getCurrentLocation } from './utils/utils';


import path from 'path';
import dotenv from 'dotenv';

//dotenv.config({ path: path.join(__dirname,'/.env') });
dotenv.config();


class App extends React.Component { 
	constructor(props) {

		super(props);
		//console.log("BORN!");

	}
	state = {
		count: 0,

		isLoading: true
	};

	add = () => {
		//console.log("add");
		this.setState(current => ({
			count: current.count +1
		}));
	};

	minus= () => {
		//console.log("add");
		this.setState(current => ({
			count: current.count -1
		}));
	};


	componentDidMount(){
		//console.log('component rendered!');
		setTimeout(() => {
			this.setState({ isLoading: false});
		}, 2000);

	}
	componentDidUpdate(){
		console.log('i just updated!');
    }


    render() {

	
		//console.log('i am rendering');
		const { isLoading } = this.state;

		return (
			<RenderAfterNavermapsLoaded
				ncpClientId={process.env.REACT_APP_NAVERMAP_CLIENT_KEY} // 자신의 네이버 계정에서 발급받은 Client ID
				error={<p>Maps Load Error</p>}
				loading={<p>Maps Loading...</p>}
			>
				<div id="container">
					<div className="menu_div">
						<img src="/images/ui/menu/hamburger.svg" className="menu_hamburger" alt="menu"></img>
						<img src="/images/ui/menu/activate.svg" className="menu_activate" alt="menu"></img>
				</div>

				<Map />
				
					
					<div className="search_group">
						<div className="map_controller"> 
							<div className="marker_change_div">
								<a href="#" className="marker_change_btn"> </a>
							</div>

							<div className="gps_div">
								<a href="#" className="gps_btn"> </a>
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
				</div>
			</RenderAfterNavermapsLoaded>
		);
	}
}

						/*
						<div className="filter_group">
							
							<div className="filter_div">
								<img src="/images/ui/s1_b.svg" alt="green"></img>
								<p>10명 규모</p>
							</div>
							<div className="filter_div">
								<img src="/images/ui/s2_b.svg" alt="green"></img>
								<p>10 - 20명 규모</p>
							</div>
							<div className="filter_div">
								<img src="/images/ui/s3_b.svg" alt="green"></img>
									<p>30명 이상</p>
							</div>
						
						</div>
						<div className="filter_instruction_div">
							<p >원하시는 카페 규모를 선택해주세요</p>
						</div>

					*/

/*
			<Router>
				<Switch>
					<Router path="/index"/>
					<Router path="/" />
				</Switch>
			</Router>
*/
						/*
						<div>
							{isLoading ? "Loading" : "Done"}
							<h1>{this.state.count}</h1>
						</div>
						<ul>
							<li onClick={this.add}>Cafe List</li>
							<li onClick={this.minus}>Cafe Find</li>
						</ul>
						*/
export default App;
