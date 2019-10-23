import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../../../contexts/UserContext'
import Typography from '@material-ui/core/Typography';

const CompleteProfilePatient = () => {

	const {user} = useContext(UserContext)

	const [fields,setFields] = useState({
		fname:user.fname,
		lname:user.lname,
		uname:user.uname,
		pwd:'',
		pwd2:''
	})

	const [isLoading,setIsLoading] = useState(false)
	const [isEntered,setIsEntered] = useState(false)

	const completeProfile = e => {
		e.preventDefault()
		setIsLoading(true)
		fetch('/apiPOST/completeProfile',{
			credentials:'include',
			method:'post',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({person:'patient',...fields})
		})
		.then(res=>res.json())
		.then(res=>{
			setIsLoading(false)
			setIsEntered(true)
		})
	}
	
	return(
		<div style={{backgroundColor: 'white', 
		margin: '40px auto 80px auto', padding: '40px', border: 'solid lightgray 1px',
	 	borderStyle: 'groove', borderRadius: '20px'}} className="container">
	 	<Typography style={{margin:'20px auto 40px auto'}}>Complete Profile</Typography>	
		<form id="enterPrescription" onSubmit={completeProfile}>
		
		<div className="form-group">
			<label>First Name</label>
			<input type="text" className="form-control"  
			value={fields.fname}
			onChange={(e)=>{
				setFields({...fields,fname:e.target.value})
			}}/>
		</div>
		
		<div className="form-group">
			<label>Last Name</label>
			<input type="text" 
			className="form-control" 
			value={fields.lname}
			onChange={(e)=>{
				setFields({...fields,lname:e.target.value})
			}}/>
		</div>

		<div className="form-group">
			<label>Username</label>
			<input type="text" 
			className="form-control"
			value={fields.uname} 
			onChange={(e)=>{
				setFields({...fields,uname:e.target.value})
			}}/>
		</div>

		<div className="form-group">
			<label>Password</label>
			<input type="password" 
			className="form-control" 
			onChange={(e)=>{
				setFields({...fields,pwd:e.target.value})
			}}/>
		</div>

		<div className="form-group">
			<label>Confirm Password</label>
			<input type="password"
			className="form-control" 
			onChange={(e)=>{
				setFields({...fields,pwd2:e.target.value})
			}}/>
		</div>

		<button type="submit" name="submit" id="btn" 
		className="form-control btn btn-primary btn-block">
		{
			(isLoading)?
			(<span className="spinner-border spinner-border-sm" 
			role="status" aria-hidden="false"></span>):(<span>Complete Profile</span>)						
		}
		</button>
		</form>
		{
			(isEntered)?(
			<div className="alert alert-success" style={{margin:'20px auto',display:'block',
			width:'100%',textAlign:'center'}}>
			Your Profile has been updated
			<a className="close" data-dismiss="alert" style={{cursor:'pointer'}}>
			&times;
			</a>
			</div>
			):(null)
		}
	</div>
		)
}

export default CompleteProfilePatient