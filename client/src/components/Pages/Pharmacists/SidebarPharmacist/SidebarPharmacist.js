import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../../../contexts/UserContext'
import {Redirect,NavLink} from 'react-router-dom'
import '../../../UniversalComponents/Sidebar/Sidebar.css'

const Sidebar = () => {

	const {user} = useContext(UserContext)
	const [image,setImage] = useState('')
	// const [sidebarInfo,setSidebarInfo] = useState({})
	const [redirect,setRedirect] = useState(false)
	const {logout} = useContext(UserContext)

	const logoutF = () => {
		logout()
		setRedirect(true)
	}

	let styles = {
		userInfo_p:{
			fontSize:'14px',
			marginBottom: 0
		},
		linebreak:{
			margin: '20px 0',
			backgroundColor: 'black',
			height: '2px'
		},
		li:{
			listStyle: 'none',
			padding: '10px',
			cursor: 'pointer',
			transition: '0.2s',
			borderRadius: '10px',
			borderTop: '1px solid #dee2e6',
			fontSize: '14px'
		},
		ul:{
			margin:0,
			padding:0
		},
		center:{
			display: 'flex',
			alignItems:'center',
			justifyContent:'center'
		}
	}

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
		<div classNameName="background">
		<div className="userInfo" style={{marginTop: '66px'}}>
			<div className="row userInfoRow" style={styles.center}>
			<div className="col-4">
				<img src={image} 
				className="img-responsive" height="60px" width="60px" alt=""/>
			</div>
			<div className="col-8">
				<p style={styles.userInfo_p}><span className="fname">{user.fname}</span> {user.lname}</p>
			</div>
			</div>
		</div>
		<div style={styles.linebreak}></div>
		<div className="menu" id="menu">
			<ul style={styles.ul}>
				<li>
					<NavLink to="/fetchPrescription">
					<i className="far fa-copy"></i> View Patient Prescriptions
					</NavLink>
				</li>
				<li>
					<NavLink to={"/profilePharmacist"}>
					<i className="fa fa-user"></i> Profile
					</NavLink>
				</li>
				<li onClick={logoutF}><i className="fa fa-sign-out-alt"></i> Log Out</li>
			</ul>
		</div>
		<div style={styles.linebreak}></div>
		<div style={{marginTop:'12%'}} align="center"><p>Health Hub Copyright &copy; 2019</p></div>

		{(redirect)?(<Redirect to="/"/>):null}
		</div>
		)
}

export default Sidebar