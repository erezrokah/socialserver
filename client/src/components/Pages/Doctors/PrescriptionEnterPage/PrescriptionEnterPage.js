import React,{useState} from 'react'
import './PrescriptionEnterPage.css'
import Typography from '@material-ui/core/Typography';

const PrescriptionEnterPage = () => {

	const [fields,setFields] = useState({
			patientusername:'',
			bloodpressuresystolic:0,
			bloodpressuredystolic:0,
			bloodsugar:0,
			bloodsugarfasting:0,
			presentingcomplaints:'',
			comments:'',
			referral:'',
			investigation:'',
			diagnosis:'',
			physiciannnotes:'',
			patientencounter:'',
			medicines:'',
			followup:''
		})
	const [isLoading,setIsLoading] = useState(false)
	const [isEntered,setIsEntered] = useState(false)

	const enterPrescription = (e) => {
		e.preventDefault()
		setIsLoading(true)
		fetch('/apiPOST/prescriptionenter',{
			credentials:'include',
			method:'post',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify(fields)
		})
		.then(res=>res.json())
		.then(res=>{
			console.log(res)
			setIsLoading(false)
			setIsEntered(true)
		})
	}
	return(
		<div style={{backgroundColor: 'white', 
		padding: '40px', border: 'solid lightgray 1px',
	 	borderStyle: 'groove', borderRadius: '20px'}} className="container">
	 	<Typography variant="h4" style={{margin:'20px auto 40px auto'}}>Enter Prescription</Typography>
		<form id="enterPrescription" onSubmit={enterPrescription}>
		
		<div className="form-group">
			<label for="patientusername">Patient Username</label>
			<input type="text" name="patientusername" className="form-control" 
			tabindex="0" data-toggle="popover" 
			data-trigger="focus" 
			data-content="No patient with this username exists. Check for typos" 
			id="patientusername" data-placement="left" 
			onChange={(e)=>{
				setFields({...fields,patientusername:e.target.value})
			}}/>
		</div>
		
		<div class="form-group">
			<div className="row">
				<div className="col">
					<label>Blood Pressure Systolic</label>
					<input type="text" name="bloodpressuresystolic" 
					className="form-control" 
					onChange={(e)=>{
						setFields({...fields,bloodpressuresystolic:e.target.value})
					}}/>
				</div>
				<div className="col">
					<label>Blood Pressure Dystolic</label>
					<input type="text" name="bloodpressuredystolic" 
					className="form-control" 
					onChange={(e)=>{
						setFields({...fields,bloodpressuredystolic:e.target.value})
					}}/>
				</div>
			</div>
		</div>
		
		<div class="form-group">
			<div className="row">
				<div className="col">
					<label>Blood Sugar Fasting</label>
					<input type="text" name="bloodsugarfasting" 
					className="form-control" 
					onChange={(e)=>{
						setFields({...fields,bloodsugarfasting:e.target.value})
					}}/>
				</div>
				<div className="col">
					<label>Blood Sugar Non-Fasting</label>
					<input type="text" name="bloodsugar" className="form-control" 
					onChange={(e)=>{
						setFields({...fields,bloodsugar:e.target.value})
					}}/>
				</div>
			</div>
		</div>
		
		<div className="form-group">
			<label>Diagnosis</label>
			<textarea name="diagnosis" className="form-control" 
			onChange={(e)=>{
				setFields({...fields,diagnosis:e.target.value})
			}}>
			</textarea>
		</div>
		


		<div className="form-group">
			<label>Investigation</label>	
			<textarea name="investigation" className="form-control" 
			onChange={(e)=>{
				setFields({...fields,investigation:e.target.value})
			}}>
			</textarea>
		</div>
		

		<div className="form-group">
			<label>Presenting Complaints</label>	
			<textarea name="presentingcomplaints" 
			className="form-control" 
			onChange={(e)=>{
				setFields({...fields,presentingcomplaints:e.target.value})
			}}>
			</textarea>
		</div>
		
		<div className="form-group">
			<label>Physician Notes</label>
			<textarea name="physichiannotes" className="form-control" 
			onChange={(e)=>{
				setFields({...fields,physiciannnotes:e.target.value})
			}}>
			</textarea>
		</div>

		<div className="form-group">
			<label>Patient Encounter</label>
			<textarea name="patientencounter" className="form-control"  
			onChange={(e)=>{
				setFields({...fields,patientencounter:e.target.value})
			}}>
			</textarea>
		</div>

		<div className="form-group">
			<label>Advice</label>
			<textarea name="advice" className="form-control" 
			onChange={(e)=>{
				setFields({...fields,advice:e.target.value})
			}}>
			</textarea>
		</div>

		<div className="form-group">
			<label>Follow Up</label>
			<textarea name="followup" className="form-control" 
			onChange={(e)=>{
				setFields({...fields,followup:e.target.value})
			}}>
			</textarea>
		</div>

		<div className="form-group">
			<label>Referral</label>
			<textarea name="referral"className="form-control" 
			onChange={(e)=>{
				setFields({...fields,referral:e.target.value})
			}}></textarea>
		</div>

		<div className="form-group">
			<label>Comments</label>
			<textarea name="comments" className="form-control" 
			onChange={(e)=>{
				setFields({...fields,comments:e.target.value})
			}}>
			</textarea>
		</div>

		<div className="form-group">
			<label>Medicines</label>
			<textarea name="medicines" className="form-control" 
			onChange={(e)=>{
				setFields({...fields,medicines:e.target.value})
			}}>
			</textarea>
		</div>
					
		{/*<input type="hidden" name="_csrf" value={csrfToken}/>*/}
			

		<button type="submit" name="submit" id="btn" 
		className="form-control btn btn-primary btn-block">
		{
			(isLoading)?
			(<span className="spinner-border spinner-border-sm" 
			role="status" aria-hidden="false"></span>):(<span>Enter Prescription</span>)						
		}
		</button>
		</form>
		{
			(isEntered)?(
			<div className="alert alert-success" style={{margin:'20px auto',display:'block',
			width:'100%',textAlign:'center'}}>
			The prescription has been entered
			<a className="close" data-dismiss="alert" style={{cursor:'pointer'}}>
			&times;
			</a>
			</div>
			):(null)
		}
	</div>
		)
}

export default PrescriptionEnterPage