import React,{useState,useEffect} from 'react'
import {Redirect,Link} from 'react-router-dom'
import classes from './SignupPage.module.css'
import Typography from '@material-ui/core/Typography';

const SignUpPage = () => {

	const [person,setPerson] = useState('patient')

	const [fields,setFields] = useState({
			uname:'',
			fname:'',
			lname:'',
			pwd:'',
			pwd2:'',
			isEqual:true
		})

	const [patientFields,setPatientFields] = useState({
			uname:'',
			fname:'',
			lname:'',
			pwd:'',
			pwd2:''
		})

	const [doctorFields,setDoctorFields] = useState({
			uname:'',
			fname:'',
			lname:'',
			pwd:'',
			pwd2:'',
			qualification:'',
			department:'',
			hospitalName:'',
			location:'',
			phoneNo:'',
			timing:''
	})

	const [pharmacistFields,setPharmacistFields] = useState({
			uname:'',
			fname:'',
			lname:'',
			pwd:'',
			pwd2:'',
			location:'',
			pharmacy:''
	})

	const [labFields,setLabFields] = useState({
			uname:'',
			fname:'',
			lname:'',
			pwd:'',
			pwd2:''
	})

	const [isLoading,setIsLoading] = useState(false)
	const [isEntered,setIsEntered] = useState(false)

	const isEqual = () => {
		if(fields.pwd==fields.pwd2){
			setFields({...fields,isEqual:true})
		}
		else{
			setFields({...fields,isEqual:false})
		}
	}

	useEffect(()=>{
		isEqual()
	},[fields.pwd,fields.pwd2])

	const signup = (e) => {
		e.preventDefault()
		setIsLoading(true)
		fetch('/apiPOST/signup',{
			credentials:'include',
			method:'post',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({person,...fields})
		})
		.then(res=>res.json())
		.then(res=>{
			console.log(res)
			setIsLoading(false)
			setIsEntered(true)
		})
	}

	const signupPatient = (e) => {
		e.preventDefault()
		setIsLoading(true)
		setTimeout(()=>{setIsLoading(false)},1000)
		fetch('http://localhost:5000/apiPOST/signup',{
			credentials:'include',
			method:'post',
			headers:{
				'Content-Type':'application/json',
				'authorization':`Bearer ${localStorage.getItem('token')}`
			},
			body:JSON.stringify({person:'patient',...patientFields})
		})
		.then(res=>res.json())
		.then(res=>{
			console.log(res)
			setIsLoading(false)
			setIsEntered(true)
		})
	}

	const signupDoctor = (e) => {
		e.preventDefault()
		setIsLoading(true)
		setTimeout(()=>{setIsLoading(false)},1000)
		fetch('http://localhost:5000/apiPOST/signup',{
			credentials:'include',
			method:'post',
			headers:{
				'Content-Type':'application/json',
				'authorization':`Bearer ${localStorage.getItem('token')}`
			},
			body:JSON.stringify({person:'doctor',...doctorFields})
		})
		.then(res=>res.json())
		.then(res=>{
			console.log(res)
			setIsLoading(false)
			setIsEntered(true)
		})
	}

	const signupPharmacist = (e) => {
		e.preventDefault()
		setIsLoading(true)
		setTimeout(()=>{setIsLoading(false)},1000)
		fetch('http://localhost:5000/apiPOST/signup',{
			credentials:'include',
			method:'post',
			headers:{
				'Content-Type':'application/json',
				'authorization':`Bearer ${localStorage.getItem('token')}`
			},
			body:JSON.stringify({person:'pharmacist',...pharmacistFields})
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
				fontSize: '14px',
				margin:'5px auto',
				textAlign: 'left',
				paddingLeft:0,
				fontSize: '14px',
				height: '40px',
				transition:'.25s'
			},
		input:{
				padding:'10px',
				borderStyle: 'solid',
				fontSize: '14px',
				margin:'5px auto',
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
			width:'860px',
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
	 		<div className="col-md-5" style={styles.col}>
	 		<div className="row selectionbelt" style={{marginBottom:'0'}}>
	 			<div className="col-md-7" style={{display:'flex',
	 			alignItems:'center'}}>
	 				<Typography variant="h4">Sign Up</Typography>
	 				<span style={{paddingLeft:'7px'}}>As</span>
	 			</div>
	 			<div className="col-md-5" style={{display:'flex',
	 			alignItems:'center',justifyContent:'center'}}>
	 			<select style={styles.select} className={
					`${classes.select} form-control`
				}
		 		onChange={
					(e)=>{
						setPerson(e.target.value)
					}
		 		}>
		 		<option value="patient">Patient</option>
		 		<option value="doctor">Doctor</option>
		 		<option value="pharmacist">Pharmacist</option>
		 		<option value="lab">Lab</option>
		 		</select>
	 			</div>
	 		</div>
	 		<form onSubmit={signup}>
			
			<div className="row">
				<div className="col-6">
				<input type="text" className={
					`${classes.input} form-control`
				} 
				style={styles.input}
				placeholder="First Name" 
				onChange={(e)=>{
					setFields({...fields,fname:e.target.value})
				}}/>
				</div>
				<div className="col-6">
				<input type="text" className={
					`${classes.input} form-control`
				} 
				placeholder="Last Name" 
				style={styles.input}
				onChange={(e)=>{
					setFields({...fields,lname:e.target.value})
				}}/>
				</div>
			</div>


			<div className="form-group">
			<input type="text" className={
				`${classes.input} form-control`
			} 
			placeholder="Username" 
			style={styles.input}
			onChange={(e)=>{
				setFields({...fields,uname:e.target.value})
			}}/>
			</div>

			<div className="form-group">
			<input type="password" className={
				`${classes.input} form-control`
			} 
			placeholder="Password" 
			style={styles.input}
			onChange={(e)=>{
				setFields({...fields,pwd:e.target.value})
			}}/>
			</div>

			<div className="form-group">
			<input type="password" className={
				`${classes.input} form-control`
			} 
			placeholder="Confirm Password" 
			style={styles.input}
			onChange={(e)=>{
				setFields({...fields,pwd2:e.target.value})
			}}/>
			</div>
			
			<div className="form-group" style={{margin:'12px 0'}}>
			<input type="checkbox"/><span style={{paddingLeft:'10px',fontSize:'14px'}}>I Agree to the <a href="">Terms and Conditions</a></span>
			</div>

			<button type="submit" name="submit" id="btn" 
			className="form-control btn btn-primary btn-block" style={styles.button}>
			{
				(isLoading)?
				(<span className="spinner-border spinner-border-sm" 
				role="status" aria-hidden="false"></span>):(<span>SignUp</span>)						
			}
			</button>
			<p style={{marginTop:'8px'}}>Already have an account? 
				<Link to="/" style={{color: '#007bff'}}> Sign In</Link>
			</p>
			</form>
	 		{/*
	 			(person=='patient')?
	 			(
	 		<form onSubmit={signupPatient}>
			
			<div className="row">
				<div className="col-6">
				<input type="text" className="form-control" placeholder="First Name" 
				onChange={(e)=>{
					setPatientFields({...patientFields,fname:e.target.value})
				}}/>
				</div>
				<div className="col-6">
				<input type="text" className="form-control" placeholder="Last Name" 
				onChange={(e)=>{
					setPatientFields({...patientFields,lname:e.target.value})
				}}/>
				</div>
			</div>


			<div className="form-group">
			<input type="text" className="form-control" placeholder="Username" 
			onChange={(e)=>{
				setPatientFields({...patientFields,uname:e.target.value})
			}}/>
			</div>

			<div className="form-group">
			<input type="password" className="form-control" placeholder="Password" 
			onChange={(e)=>{
				setPatientFields({...patientFields,pwd:e.target.value})
			}}/>
			</div>

			<div className="form-group">
			<input type="password" className="form-control" placeholder="Confirm Password" 
			onChange={(e)=>{
				setPatientFields({...patientFields,pwd2:e.target.value})
			}}/>
			</div>
			
			<div className="form-group" style={{margin:'12px 0'}}>
			<input type="checkbox"/><span style={{paddingLeft:'10px',fontSize:'14px'}}>I Agree to the <a href="">Terms and Conditions</a></span>
			</div>

			<button type="submit" name="submit" id="btn" 
			className="form-control btn btn-primary btn-block" style={styles.button}>
			{
				(isLoading)?
				(<span className="spinner-border spinner-border-sm" 
				role="status" aria-hidden="false"></span>):(<span>SignUp</span>)						
			}
			</button>
			<p style={{marginTop:'8px'}}>Already have an account? 
				<Link to="/" style={{color: '#007bff'}}> Sign In</Link>
			</p>
			</form>
	 			):
	 			(person=='doctor')?
	 			(
	 			<form onSubmit={signupDoctor}>
		
				<div className="form-group">
				
				<input type="text" className="form-control" placeholder="First Name" 
				onChange={(e)=>{
					setDoctorFields({...doctorFields,fname:e.target.value})
				}}/>
				</div>

				<div className="form-group">
				
				<input type="text" className="form-control" placeholder="Last Name" 
				onChange={(e)=>{
					setDoctorFields({...doctorFields,lname:e.target.value})
				}}/>
				</div>

				<div className="form-group">
				
				<input type="text" className="form-control" placeholder="Hospital Name" 
				onChange={(e)=>{
					setDoctorFields({...doctorFields,hospitalName:e.target.value})
				}}/>
				</div>

				<div className="form-group">
			
				<input type="text" className="form-control" placeholder="Department" 
				onChange={(e)=>{
					setDoctorFields({...doctorFields,department:e.target.value})
				}}/>
				</div>

				<div className="form-group">
				
				<input type="text" className="form-control" placeholder="Location"  
				onChange={(e)=>{
					setDoctorFields({...doctorFields,location:e.target.value})
				}}/>
				</div>

				<div className="form-group">
			
				<input type="text" className="form-control" placeholder="Phone Number" 
				onChange={(e)=>{
					setDoctorFields({...doctorFields,phoneNo:e.target.value})
				}}/>
				</div>

				<div className="form-group">
			
				<input type="text" className="form-control" placeholder="Timing" 
				onChange={(e)=>{
					setDoctorFields({...doctorFields,timing:e.target.value})
				}}/>
				</div>

				<div className="form-group">
				
				<input type="text" className="form-control" placeholder="Username" 
				onChange={(e)=>{
					setDoctorFields({...doctorFields,uname:e.target.value})
				}}/>
				</div>

				<div className="form-group">
			
				<input type="password" className="form-control" placeholder="Password" 
				onChange={(e)=>{
					setDoctorFields({...doctorFields,pwd:e.target.value})
				}}/>
				</div>

				<div className="form-group">
			
				<input type="password" className="form-control" placeholder="Confirm Password" 
				onChange={(e)=>{
					setDoctorFields({...doctorFields,pwd2:e.target.value})
				}}/>
				</div>
			
				

				<button type="submit" name="submit" id="btn" 
				className="form-control btn btn-primary btn-block">
				{
					(isLoading)?
					(<span className="spinner-border spinner-border-sm" 
					role="status" aria-hidden="false"></span>):(<span>SignUp</span>)						
				}
				</button>
				</form>
	 			):
	 			(person=='pharmacist')?
	 			(
	 			<form onSubmit={signupPharmacist}>
		
				<div className="form-group">
				
				<input type="text" className="form-control" placeholder="First Name"  
				onChange={(e)=>{
					setPharmacistFields({...pharmacistFields,fname:e.target.value})
				}}/>
				</div>

				<div className="form-group">
				
				<input type="text" className="form-control" placeholder="Last Name" 
				onChange={(e)=>{
					setPharmacistFields({...pharmacistFields,lname:e.target.value})
				}}/>
				</div>

				<div className="form-group">
				
				<input type="text" className="form-control" placeholder="Pharmacy" 
				onChange={(e)=>{
					setPharmacistFields({...pharmacistFields,pharmacy:e.target.value})
				}}/>
				</div>

				<div className="form-group">
				
				<input type="text" className="form-control" placeholder="Location" 
				onChange={(e)=>{
					setPharmacistFields({...pharmacistFields,location:e.target.value})
				}}/>
				</div>

				<div className="form-group">
				
				<input type="text" className="form-control" placeholder="Username" 
				onChange={(e)=>{
					setPharmacistFields({...pharmacistFields,uname:e.target.value})
				}}/>
				</div>

				<div className="form-group">
				
				<input type="password" className="form-control" placeholder="Password" 
				onChange={(e)=>{
					setPharmacistFields({...pharmacistFields,pwd:e.target.value})
				}}/>
				</div>

				<div className="form-group">
				
				<input type="password" className="form-control" placeholder="Confirm Password" 
				onChange={(e)=>{
					setPharmacistFields({...pharmacistFields,pwd2:e.target.value})
				}}/>
				</div>
			
				

				<button type="submit" name="submit" id="btn" style={{fontSize:'14px'}}
				className="form-control btn btn-primary btn-block">
				{
					(isLoading)?
					(<span className="spinner-border spinner-border-sm" 
					role="status" aria-hidden="false"></span>):(<span>SignUp</span>)						
				}
				</button>
			</form>
	 			):
	 			(person=='lab')?
	 			(<div>Lab Form</div>):null*/
	 		}
	 		
			{
			(isEntered)?(
			<Redirect to={{pathname:"/profilePicture",state:{account:true}}}/>
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

export default SignUpPage