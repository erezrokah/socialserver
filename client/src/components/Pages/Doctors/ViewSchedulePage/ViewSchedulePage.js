import React,{useState,useEffect} from 'react'
import './ViewSchedulePage.css'
import Typography from '@material-ui/core/Typography';

const ViewSchedulePage = () => {

	const [schedule,setSchedule] = useState([])

	const fetchSchedule = () => {
		fetch('/apiGET/fetchSchedule',{
			headers:{
				'authorization':`Bearer ${localStorage.getItem('token')}`,
				'Content-Type':'application/json'
			},
			credentials:'include'
		})
		.then(res=>res.json())
		.then(res=>{
			setSchedule(res)
		})
	}

	useEffect(()=>{
		fetchSchedule()
	},[])

	return(
		<div className="container animated fadeIn" style={{backgroundColor: 'white', 
		padding: '40px', border: 'solid lightgray 1px', borderStyle: 'groove', 
		borderRadius: '20px'}}>
		<Typography variant="h4">Schedule</Typography>
			<table className="table table-striped">
			<thead>
			<tr id='heading'>
	            <th>Patient Name</th>
	            <th>Date</th>
	            <th>Time</th>
			</tr>
			</thead>
			<tbody>
			{schedule.map(schedule=>(
				<tr>
					<td>{schedule.unamepat}</td>
					<td>{schedule.date}</td>
					<td>{schedule.time}</td>
				</tr>
				))}
			</tbody>		
			</table>
		</div>
		)
}

export default ViewSchedulePage