import React,{useState,useEffect} from 'react'
import {Redirect,Link} from 'react-router-dom'
import './SignUpProfilePage.css'

const SignUpProfilePage = () => {

	const [person,setPerson] = useState('patient')
	const [profileImage,setProfileImage] = useState({})

	const [isLoading,setIsLoading] = useState(false)
	const [isEntered,setIsEntered] = useState(false)

	const profileImageHandler = (e) => {
		e.preventDefault()
		setIsLoading(true)
		// const data = new FormData()
		// data.append('file',profileImage)
		// console.log(data)
		fetch('/apiPOST/profileUpload',{
			credentials:'include',
			method:'post',
			headers:{
				'Content-Type':profileImage.type
			},
			body:profileImage
		})
		.then(res=>res.json())
		.then(res=>{
			console.log(res)
			setIsLoading(false)
			setIsEntered(true)
		})
	}

	let styles = {
		select:{
				padding:'10px',
				width:'150px',
				cursor:'pointer',
				borderStyle: 'solid',
				borderColor: 'white',
				fontSize: '14px',
				margin:'5px auto',
				boxShadow: '0 0 0',
				borderBottomColor:'lightgray',
				textAlign: 'left',
				paddingLeft:0,
				fontSize: '14px',
				height: '40px',
				transition:'.25s'
			},
		input:{
				padding:'10px',
				width:'100px',
				borderStyle: 'solid',
				borderColor: 'white',
				fontSize: '14px',
				margin:'5px auto',
				boxShadow: '0 0 0',
				borderBottomColor:'lightgray',
				textAlign: 'left',
				paddingLeft:0,
				fontSize: '14px',
				height: '40px',
				transition:'.25s'
			},
		button:{
				color: 'white',
				marginTop: '5px',
				transition:'.25s',
				fontSize:'14px'
			},
		formContent:{
			width:'850px',
			backgroundColor:'white',
			boxShadow:'0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05)',
			borderRadius:'20px',
			padding:0
		},
		col:{
			padding:'50px 40px 50px 60px'
		}				
	}

	return(
		<div style={{backgroundColor: '#f4f4f4',minHeight:'100vh',display:'flex',
		alignItems:'center',justifyContent:'center'}}>
		<div id="signupform-content" style={styles.formContent}>
	 	<div className="row">
	 		<div className="col-md-5" style={{...styles.col,alignItems:'center',display:'flex'}}>
		 		<form onSubmit={profileImageHandler}>
				<input type="file" name="file" onChange={(e)=>{
					setProfileImage(e.target.files[0])
				}}/>
				<button type="submit" name="submit" id="btn" 
				style={{fontSize:'14px',
						margin:'20px auto'
					}}
					className="form-control btn btn-primary btn-block">
					{
						(isLoading)?
						(<span className="spinner-border spinner-border-sm" 
						role="status" aria-hidden="false"></span>):(<span>Upload Image</span>)						
					}
					</button>
				</form>
			{
			(isEntered)?(
			<Redirect to={{pathname:"/",state:{account:true}}}/>
			):(null)
			}
	 		</div>
	 		<div className="col-md-7">
	 			<img src={"images/banner3.jpg"}  width='100%' height = '100%'
				style={{borderRadius:'0 20px 20px 0'}}/>
	 		</div>
	 	</div>	
	</div>
	</div>
		)
}

export default SignUpProfilePage