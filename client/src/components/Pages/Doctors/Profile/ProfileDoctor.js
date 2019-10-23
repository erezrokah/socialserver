import React,{useContext,useState,useEffect} from 'react'
import {UserContext} from '../../../../contexts/UserContext'

const ProfileDoctor = () => {
	
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
		<div className="container animated fadeIn" style={{backgroundColor: 'white', 
		padding: '30px', border: 'solid lightgray 1px', borderStyle: 'groove', 
		borderRadius: '20px'}} align="center">
		<img className="profilePic" src={image} 
		height="150px" width="150px" className="img-thumbnail img-responsive"
		style={{borderRadius:'50%',margin:'10px auto 30px auto'}}/>
			<table className="table table-striped">
				<tr>
					<td>Username</td>
					<td>{user.uname}</td>
				</tr>
				<tr>
					<td>Name</td>
					<td>{user.fname} {user.lname}</td>
				</tr>
				<tr>
					<td>Hospital Name</td>
					<td>{user.hospitalName}</td>
				</tr>
				<tr>
					<td>Location</td>
					<td>{user.location}</td>
				</tr>
				<tr>
					<td>Department</td>
					<td>{user.department}</td>
				</tr>
				<tr>
					<td>Qualification</td>
					<td>{user.qualification}</td>
				</tr>
				<tr>
					<td>Phone Number</td>
					<td>{user.phoneNo}</td>
				</tr>
			</table>
		</div>
		)
}

export default ProfileDoctor