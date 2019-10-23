import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import './QRCodePagePharmacist.css'
const QRCode = require('qrcode.react')

const QRCodePagePharmacist = ({location}) => {
	/*const [redirect,setRedirect] = useState(false)
	if(location.state){
		console.log(location.state.username)
	}*/
	/*else{
		setRedirect(true)
	}*/
	return(
		<div className="container animated fadeIn" style={{backgroundColor: 'white', 
		padding: '40px', border: 'solid lightgray 1px', borderStyle: 'groove', 
		borderRadius: '20px'}}>
		<div className="row">

		<div id="directions"className="col-lg-6" style={{paddingLeft: '50px', paddingTop: '30px'}}>
			<h2>To Display the data on this computer</h2>
			<ol style={{paddingLeft: '15px'}}>
				<li>Log Into Your HealthHub App</li>
				<li>Scan The QR Code displayed on the right</li>
			</ol>
		</div>
		<div className="col-lg-6" align="center">
			<QRCode value={location.state.username} size={256} />
		</div>
		<span id="displaymsg"></span>
		</div>
		{
			/*(redirect)?(<Redirect to={{pathname:'/f',
			state:{error:'First Enter Username in the text field to generate QRCode'}}}/>):
			(null)*/
		}
		</div>	
		)
}

export default QRCodePagePharmacist