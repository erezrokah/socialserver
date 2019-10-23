import React,{useContext,useState} from 'react'
import {Redirect,Link} from 'react-router-dom'
import {UserContext} from '../../../contexts/UserContext'
import classes from './SignInPage.module.css'
import {AuthContext} from '../../../contexts/AuthContext'
import Typography from '@material-ui/core/Typography';

const SignInPage  = props => {

	const {setAuth} = useContext(AuthContext)
	const [newAccount,setNewAccount] = useState(props.location.state?props.location.state.account:false)
	const [fields,setFields] = useState({
		username:'',
		password:'',
		person:'patient',
		rememberMe:false
	})

	const [isLoading,setIsLoading] = useState(false)
	const {setUser} = useContext(UserContext)

	const [redirect1,setRedirect1] = useState(false)
	const [redirect2,setRedirect2] = useState(false)
	const [redirect3,setRedirect3] = useState(false)

	let styles = {
		select:{
				padding:'10px',
				cursor:'pointer',
				borderStyle: 'solid',
				fontSize: '14px',
				margin:'5px auto 0px auto',
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
			width:'800px',
			backgroundColor:'white',
			boxShadow:'0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05)',
			padding:'0px',
			borderRadius:'20px'
		},
		col:{
			padding:'60px 60px 60px 40px'
		}				
	}

	const SignIn = (e) => {
		console.log(fields)
		e.preventDefault()
		setIsLoading(true)
		fetch('/apiPOST/signin',{
			method:'post',
			credentials:'include',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				uname:fields.username,
				pwd:fields.password,
				person:fields.person,
				rememberMe:fields.rememberMe
			})
		})
		.then(res=>res.json())
		.then(res=>{
			setIsLoading(false)
			if(res.login=="success"){
				setUser(res.user)
				setAuth(true)
				localStorage.setItem('token',res.token)
				localStorage.setItem('user',JSON.stringify(res.user))
				switch(fields.person){
					case 'patient':
						setRedirect1(true)
						break
					case 'doctor':
						setRedirect2(true)
						break
					case 'pharmacist':
						setRedirect3(true)
						break	
				}
				console.log(res)
			}
			else{
				console.log(res)
			}
		}).catch(function(err){
			setIsLoading(false)
			console.log(err)
		})
	}

	return(
		<div style={{backgroundColor: '#f4f4f4', height:'100vh',display:'flex',
		alignItems:'center',justifyContent:'center'}}>
			<div id="form-content" style={styles.formContent}>
			<div className="row">
				<div className="col-sm-7">
					<img src={"images/SignIn.jpg"} width='100%' height = '100%'
					style={{borderRadius:'20px 0 0 20px'}}/>
				</div>
				<div className="col-sm-5" style={styles.col}>
				<form onSubmit={SignIn}>
				<Typography variant="h3" style={{marginBottom:'10px'}}>Sign In</Typography>
				<div className="form-group">
				<input type="text" name="username" placeholder="Username" className={
					`${classes.input} form-control`
				}
				value={fields.username} onChange={(e)=>{
					setFields({...fields,username:e.target.value})
				}} style={styles.input}/>
				</div>
				
				<div className="form-group">	
				<input type="Password" name="password" placeholder="Password" className={
					`${classes.input} form-control`
				}
				value={fields.password} onChange={(e)=>{
					setFields({...fields,password:e.target.value})
				}} style={styles.input}/>
				</div>
					
				<select name="person" id="person" className={
					`${classes.select} form-control`
				} 
				onChange={(e)=>{
					setFields({...fields,person:e.target.value})
				}} style={styles.select}>
					<option value="patient">Patient</option>	
					<option value="doctor">Doctor</option>
					<option value="pharmacist">Pharmacist</option>	
					<option value="lab">Lab</option>
				</select>
			
				<input type="hidden" name="_csrf"/>
			
				<div className="form-group" style={{margin:'12px 0'}}>
				<input type="checkbox"
				onChange={(e)=>{
					console.log(e.target)
					console.log(typeof e.target.value)
					setFields({...fields,rememberMe:e.target.checked})
				}}/><span style={{paddingLeft:'10px',fontSize:'14px'}}>Remember me</span>
				</div>

				<button type="submit" name="submitin" style={styles.button} 
				className="gap btn btn-primary btn-block" id="btn-in">
					{
						(isLoading)?(
							<span className="spinner-border spinner-border-sm" 
							role="status" aria-hidden="false"></span>):(<span>Sign In</span>)						
					}
				</button>
			
			
				<p style={{marginTop:'8px'}}>Don't have an account? 
					<Link to="/signup" style={{color: '#007bff'}}> Sign Up</Link>
				</p>

			</form>
				</div>
			</div>
			{
				(redirect1)?(<Redirect to='/dashboard'/>):(null)
			}
			{
				(redirect2)?(<Redirect to="/enterPrescription"/>):(null)
			}
			{
				(redirect3)?(<Redirect to="/fetchPrescription"/>):(null)
			}
			{
			(newAccount)?(
			<div className="alert alert-success" style={{margin:'20px auto',display:'block',
			width:'80%',textAlign:'center'}}>
			Your Account has been created. You can now login
			<a className="close" data-dismiss="alert" style={{cursor:'pointer'}}>
			&times;
			</a>
			</div>
			):(null)
			}
			</div>
		</div>
		)
}

export default SignInPage