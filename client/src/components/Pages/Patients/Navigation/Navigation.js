import React from 'react'


const Navigation = () => {

	/*function initMap() {
  		// The location of Uluru
  		var uluru = {lat: -25.344, lng: 131.036};
  		// The map, centered at Uluru
  		var map = new google.maps.Map(
      	document.getElementById('map'), {zoom: 4, center: uluru});
  		// The marker, positioned at Uluru
  		var marker = new google.maps.Marker({position: uluru, map: map});
	}*/
	
	return(
		<div className="container" style={{backgroundColor: 'white', 
		padding: '20px', border: 'solid lightgray 1px',
	 	borderStyle: 'groove', borderRadius: '20px'}}>
			<div id="map" style={{margin:'80px auto 80px auto',height: '400px',  /* The height is 400 pixels */
        	width:'100%'}}></div>
		</div>	
		)
}

export default Navigation