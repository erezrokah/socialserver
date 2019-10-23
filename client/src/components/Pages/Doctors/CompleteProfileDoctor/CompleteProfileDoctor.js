import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../../../contexts/UserContext'
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';

const CompleteProfilePatient = () => {

	const {user} = useContext(UserContext)

	const [selectedTime,setSelectedTime] = useState(new Date())

	const [fields,setFields] = useState({
			uname:user.uname,
			fname:user.fname,
			lname:user.lname,
			pwd:'',
			pwd2:'',
			qualification:user.qualification,
			department:user.department,
			hospitalName:user.hospitalName,
			locationHospital:user.location,
			phoneNo:user.phoneNo,
			timing:user.timing
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
			body:JSON.stringify({person:'doctor',...fields})
		})
		.then(res=>res.json())
		.then(res=>{
			setIsLoading(false)
			setIsEntered(true)
		})
	}
	
	const handleTimeChange = (time) => {
		setSelectedTime(time)
	}

	return(
		<div style={{backgroundColor: 'white', 
		margin: '40px auto 80px auto', padding: '40px', border: 'solid lightgray 1px',
	 	borderStyle: 'groove', borderRadius: '20px'}} className="container">
	 	<Typography variant="h4" style={{margin:'20px auto 40px auto'}}>Profile Information</Typography>
		<form id="enterPrescription" onSubmit={completeProfile}>
		
		<div className="form-group">
			<label>First Name</label>
			<input type="text" className="form-control" required
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
			<label>Hospital Name</label>
			<input type="text" className="form-control" 
			value={fields.hospitalName} 
			onChange={(e)=>{
				setFields({...fields,hospitalName:e.target.value})
			}}/>
		</div>

		<div className="form-group">
			<label>Department</label>
			<input type="text" className="form-control"
			value={fields.department}  
			onChange={(e)=>{
				setFields({...fields,department:e.target.value})
			}}/>
		</div>

		<div className="form-group">
			<label>Qualification</label>
			<input type="text" className="form-control"
			value={fields.qualification}  
			onChange={(e)=>{
				setFields({...fields,qualification:e.target.value})
			}}/>
		</div>

		<div className="form-group">
			<label>Location</label>
			<input type="text" className="form-control"
			value={fields.locationHospital}  
			onChange={(e)=>{
				setFields({...fields,locationHospital:e.target.value})
			}}/>
		</div>

		<div className="form-group">
			<label>Timing</label>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<div className="row">
				<div className="col-md-6">
					<KeyboardTimePicker
					  style={{width:'100%',fontSize:14}}
			          margin="normal"
			          label="Start Date"
			          value={selectedTime}
			          onChange={handleTimeChange}
			          KeyboardButtonProps={{
			            'aria-label': 'change time',
			          }}
			        />
				</div>
				<div className="col-md-6">
					<KeyboardTimePicker
					  style={{width:'100%',fontSize:'14px'}}
			          margin="normal"
			          label="End Date"
			          value={selectedTime}
			          onChange={handleTimeChange}
			          KeyboardButtonProps={{
			            'aria-label': 'change time',
			          }}
			        />
				</div>
			</div>
			</MuiPickersUtilsProvider>
			{/*<input type="text" className="form-control"
			value={fields.timing}  
			onChange={(e)=>{
				setFields({...fields,timing:e.target.value})
			}}/>*/}
		</div>

		<div className="form-group">
			<label>Phone Number</label>
			<input type="text" className="form-control"
			value={fields.phoneNo}  
			onChange={(e)=>{
				setFields({...fields,phoneNo:e.target.value})
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
			Your Record has been updated
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