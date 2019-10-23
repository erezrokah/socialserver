import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar'
import {Redirect} from 'react-router-dom'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './AppointmentPage.css'

const AppointmentPage = props => {

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [unamedoc,setUnameDoc] = useState(
		props.location.state?props.location.state.uname:'')
	const [date,setDate] = useState('')
	const [time,setTime] = useState('')
	const [isLoading,setIsLoading] = useState(false)
	const [timeSlots,setTimeSlots] = useState([
		'------ Select Time Slot ------',
		'10:00 am to 10:15 am',
		'10:15 am to 10:30 am',
		'10:30 am to 10:45 am',
		'10:45 am to 11:00 am',
		'11:00 am to 11:15 am',
		'11:15 am to 11:30 am',
		'11:30 am to 11:45 am',
		'11:45 am to 12:00 am',
		])
	const [available_time_slots,setAvailableTimeSlots] = useState([])
	const [visibleCalendar,setVisibleCalendar] = useState(false)
	const [isEntered,setIsEntered] = useState(false)
	
	useEffect(()=>{
		fetchTimeSlots()	
	},[date])

	if(!props.location.state){
		return(
			<Redirect to="/appointment"/>
			)
	}

	const disableDays = (date) => {
		// return([new Date(2019,9,22)])
		return date.getDay == 0 || date.getDay == 6 
	}	

	const fetchTimeSlots = () => {
		fetch('/apiPOST/fetchTimeSlots',{
			method:'post',
			headers:{
				'authorization':`Bearer ${localStorage.getItem('token')}`,
				'Content-Type':'application/json'
			},
			body:JSON.stringify({unamedoc,date}),
			credentials:'include'
		})
		.then(res=>res.json())
		.then(res=>{
			console.log(res)
			let availableTimeSlots = res.timeSlots.map((time)=>time.time)
			console.log(availableTimeSlots)
			availableTimeSlots = timeSlots.filter((time)=>!availableTimeSlots.includes(time))
			console.log(availableTimeSlots)
			setAvailableTimeSlots(availableTimeSlots)
		})
		.catch(err=>{
			console.log(err)
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setIsLoading(true)
		fetch('/apiPOST/enterTimeSlot',{
			method:'post',
			headers:{
				'authorization':`Bearer ${localStorage.getItem('token')}`,
				'Content-Type':'application/json'
			},
			body:JSON.stringify({unamedoc,date,time}),
			credentials:'include'
		})
		.then(res=>res.json())
		.then(res=>{
			setIsLoading(false)
			setIsEntered(true)
			fetchTimeSlots()
		})
	}

	const setDatePromise = (date) => {
		return new Promise((resolve,reject)=>{
			setDate(date)
			resolve()
		})
	}

	const handleDateChange = (date) => {
		setSelectedDate(date)
	}

	return(
		<div className="card" id="appointment" 
		style={{backgroundColor: 'white', 
		border: 'solid lightgray 1px',
	 	borderStyle: 'groove', borderRadius: '20px'}}>
		 			<div className="card-header">
		 				Schedule Appointments with Dr {props.location.state.fname} {props.location.state.lname}
		 			</div>
		 			<div className="card-body" id="appointmentFields">
						<form onSubmit={handleSubmit}>
						{
							/*<div className="form-group">
							<label>Enter Doctor's Username</label>
							<input className="form-control" value={unamedoc} 
							onChange={(e)=>{
								setUnameDoc(e.target.value)						
							}}/>
							</div>*/
						}	
						<div className="form-group">
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<label>Choose a day</label>
							<KeyboardDatePicker
							  style={{width:'100%'}}
					          margin="normal"
					          id="date-picker-dialog"
					          format="dd/MM/yyyy"
					          value={selectedDate}
					          onChange={handleDateChange}
					          KeyboardButtonProps={{
					            'aria-label': 'change date',
					          }}
					        />

						{
							/*
							<input className="form-control" value={date} 
							onFocus={()=>{setVisibleCalendar(true)}}/>
							(visibleCalendar)?(
								<Calendar
								tileDisabled={(date)=>{disableDays(date)}} 
								className="calendar animated fadeIn"
								onClickDay={(date)=>{
									let formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
									// console.log(date.getFullYear())
									setDatePromise(formattedDate)
									.then(()=>{
										setVisibleCalendar(false)		
									})}}
								/>):(null)*/
						}
						</MuiPickersUtilsProvider>
						</div>
						<div className="form-group">
							<label>Choose time slot</label>
							<select name="time" className="form-control" onChange={
								(e)=>{
									setTime(e.target.value)
								}
							}>
								{
									available_time_slots.map((time)=>(
										<option value={time}>{time}</option>
										))
								}
							</select>
						</div>
						<button type="submit" name="submit" id="btn" 
						className="form-control btn btn-primary btn-block">
						{
							(isLoading)?
							(<span className="spinner-border spinner-border-sm" 
							role="status" aria-hidden="false"></span>):(<span>Schedule Appointment</span>)						
						}
						</button>
						</form>
						{
							(isEntered)?(
							<div className="alert alert-success" style={{margin:'20px auto',display:'block',
							width:'100%',textAlign:'center'}}>
							Your Appointment has been scheduled
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

export default AppointmentPage