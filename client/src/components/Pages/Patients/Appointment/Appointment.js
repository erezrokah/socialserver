import React,{useState,useEffect} from 'react'
import {Route,Link,Redirect} from 'react-router-dom'

const Appointment = () => {
	const [doctorInfo,setDoctorInfo] = useState([])

	const fetchInfo = () => {
		fetch('/apiGET/doctorinfo',{
			credentials:'include',
			headers:{
				'authorization':`Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res=>res.json())
		.then(info=>{
			setDoctorInfo(info)
		})
	}

	useEffect(()=>{
		fetchInfo()
	},[])

	return(
	<div className="container" style={{backgroundColor: 'white', 
	padding: '40px', border: 'solid lightgray 1px',
	 borderStyle: 'groove', borderRadius: '20px'}}>	
	 	<Route path="/appointment/:unamedoc" render={({match})=>{
	 		console.log(match)
	 		console.log(doctorInfo)
	 		if(typeof doctorInfo == 'undefined'){
	 			return(
	 				<Redirect to="/doctorinfo"/>
	 				)
	 		}
	 		else{
	 			let info = doctorInfo.find(info=>info.unamedoc==match.params.unamedoc)
	 			return(
	 				<Detail info={info}/>
	 				)
	 		}
	 	}}/>
		<div className="doctorsList">
			<table className="table table-striped" id="docinfo">
				<thead>
					<tr>
						<th>Name</th>
						<th>Location</th>
						<th>Hospital/Clinic</th>
						<th>Department</th>
						<th>More Info</th>
					</tr>
				</thead>
				<tbody>
				{doctorInfo.map(docinfo=>(
					<tr>
					<td>{docinfo.fnamedoc} {docinfo.lnamedoc}</td>
					<td>{docinfo.location}</td>
					<td>{docinfo.hospitalName}</td>
					<td>{docinfo.department}</td>
					<td><Link to={`/appointment/${docinfo.unamedoc}`}>{docinfo.unamedoc}</Link></td>
				</tr>
					))}
				</tbody>	
			</table>
		</div>
	</div>	
		)
}

const Detail = ({info}) => {

	return(
	<div className="detail" style={{margin:'20px 0',padding:'10px',borderRadius:'20px',
	border:'solid 2px black'}}>
		<div align="center" style={{margin:'10px auto 20px auto'}}>
			<img className="profilePic" src={'../profileimage/sufyan.png'} 
			height="150px" width="150px" className="img-thumbnail img-responsive"
			style={{borderRadius:'50%'}}/>
			<div style={{marginTop:'5px'}}>
				<Link to={{pathname:'/appointmentpage',state:{uname:info.unamedoc,fname:info.fnamedoc,lname:info.lnamedoc}}}>
				Scedhule Appointment <i className="far fa-bell"></i>
				</Link>
			</div>	
		</div>
	 	<table className="table table-striped">
				<tr>
					<td>Username</td>
					<td>{info.unamedoc}</td>
				</tr>
				<tr>
					<td>Name</td>
					<td>{info.fnamedoc} {info.lnamedoc}</td>
				</tr>
				<tr>
					<td>Hospital Name</td>
					<td>{info.hospitalName}</td>
				</tr>
				<tr>
					<td>Location</td>
					<td>{info.location}</td>
				</tr>
				<tr>
					<td>Department</td>
					<td>{info.department}</td>
				</tr>
				<tr>
					<td>Qualification</td>
					<td>{info.qualification}</td>
				</tr>
				<tr>
					<td>Phone Number</td>
					<td>{info.phone_number}</td>
				</tr>
			</table>
	</div>
	)
}

export default Appointment