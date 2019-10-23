import React,{useContext,useState,useEffect} from 'react'
import {PrescriptionContext} from '../../../../contexts/PrescriptionContext'
import './DetailedPrescriptionPage.css'
import {UserContext} from '../../../../contexts/UserContext'

const DetailedPrescriptionPage = ({location}) => {

	const data = location.state.prescription	
	const {user} = useContext(UserContext)
	const [image,setImage] = useState('')

	const fetchImage = () => {
		fetch('/apiGET/profilePic',{
			credentials:'include',
			headers:{
				'authorization':`Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res=>res.blob())
		.then(image=>{
			var url = URL.createObjectURL(image)
			setImage(url)
		})
	}

	useEffect(()=>{
		fetchImage()
	},[])

	return(
		<div className="container" style={{backgroundColor: 'white', margin: 
		'40px auto 80px auto', padding: '40px', border: 'solid lightgray 1px',
		 borderStyle: 'groove', borderRadius: '20px',fontSize:'14px'}}>	
	<div className="pres" style={{borderRadius:'20px'}}>
		<div className="row">
			<div className="col-md-9 content">
			<b>Name:</b> {user.fname} {user.lname}	
			</div>
			<div className="col-md-3 content" align="center">
				<img src={image} 
				height="100px" width="100px" alt=""/>
			</div>	
		</div>	



		<div className="row row-1">	
			<div className="col-md content">
				<b>Presenting Compaints:</b> {data.presentingcomplaints}
			</div>
			<div className="col-md content">
				<b>Diagnosis:</b> {data.diagnosis}
			</div>	
		</div>




		<div className="row row-2">
			<div className="col-md-9">
				<div className="row">
					<div className="col-md content"><b>Investigation:</b>
					 {data.investigation}</div>
				</div>
				<div className="row">
					<div className="col-md content"><b>Physichian Notes:</b>
					 {data.physiciannotes}</div>
				</div>
				<div className="row">
					<div className="col-md content"><b>Patient Encounter:</b>
					 {data.patientencounter}</div>
				</div>
			</div>
			<div className="col-md-3 content">
				<b>Referral:</b>{data.referral}
			</div>
		</div>



		<div className="row">
			<div className="col-md-9 content">
				<b>Vitals:</b>
				<table border="1" className="table">
					<tr>
					<th>Sugar</th>
					<th>B.P(mmHg)</th>
					<th>Temperature(F)</th>
					<th>Weight</th>
					<th>BMI</th>	
					</tr>
					<tr>
					<td>{data.bloodsugar}</td>
					<td> {data.bloodpressuresystolic}</td>
					<td></td>
					<td></td>
					<td></td>	
					</tr>
				</table>
			</div>
			<div className="col-md-3 content">
				<b>Advice:</b> {data.advice}
			</div>	
		</div>



		<div className="row">
			<div className="col-md-9 content">
				<b>Medication:</b><br/>	
				 {data.medicines}
			</div>
			<div className="col-md-3 content">
			<b>Follow up:</b> {data.followup}	
			</div>
		</div>	
	</div>	
</div>
		)
}

export default DetailedPrescriptionPage