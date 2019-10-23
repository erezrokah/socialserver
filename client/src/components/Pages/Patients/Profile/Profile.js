import React,{useContext,useState,useEffect} from 'react'
import {UserContext} from '../../../../contexts/UserContext'

const Profile = () => {
	
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
		<div align="center" style={{backgroundColor: 'white', 
		padding: '20px', border: 'solid lightgray 1px',borderStyle: 'groove',
		borderRadius: '20px'}} className="container animated fadeIn">
			<img className="profilePic" src={image} 
			height="150px" width="150px" className="img-thumbnail img-responsive"
			style={{margin:'20px auto 35px auto',borderRadius:'50%'}}/>
		<br/>
		<table className="table table-striped">
			<tr>
				<td>Username</td>
				<td>{user.uname}</td>
			</tr>
			<tr>
				<td>Name</td>
				<td>{user.fname} {user.lname}</td>
			</tr>
		</table>
		</div>
		)
}

export default Profile