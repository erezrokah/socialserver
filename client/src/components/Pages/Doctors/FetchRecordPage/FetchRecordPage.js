import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';

const FetchRecordPage = () => {

	const [username,setUsername] = useState('')
	const [redirect,setRedirect] = useState(false)

	const genQRCode = () => {
		setRedirect(true)
	}

	let styles = {
		button:{	
			width:'200px',
			color: 'white',
			marginTop: '10px',
			transition:'.25s'
		},
		input:{
			padding:'10px',
			width:'200px',
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
		}
		
	}

	return(
	<div style={{backgroundColor: 'white', 
		margin: '40px auto 80px auto', padding: '60px', border: 'solid lightgray 1px',
	 	borderStyle: 'groove', borderRadius: '20px'}} className="container fetchRecord"
	 	align="center">
	<Typography variant="h4">Get Previous Patient Record</Typography>
	<form onSubmit={genQRCode}>
		<input className="form-control" 
		type="text" name="patientusername" placeholder="Patient Username" 
		style={{margin:'5px 0',width:'190px',...styles.input}} 
		onChange={
			(e)=>{
				setUsername(e.target.value)
			}
		}/>
		<button type="submit" className="btn btn-primary" style={styles.button}>
		Get Data</button>
	</form>
	{
		(redirect)?(<Redirect to={{pathname:'/qrcodeRecord',state:{username}}}/>):(null)
	}
	</div>
	)
}

export default FetchRecordPage