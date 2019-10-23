import React,{useContext,useEffect,useState} from 'react'
import {PrescriptionContext} from '../../../../contexts/PrescriptionContext'
import Charts from './DashboardPageComponents/Charts'
import Prescriptions from './DashboardPageComponents/Prescriptions'
import Reports from './DashboardPageComponents/Reports'
import './DashboardPage.css'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import {AuthContext} from '../../../../contexts/AuthContext'
import {Redirect} from 'react-router-dom'

const DashboardPage = () => {

	const [prescriptions,setPrescriptions] = useState({
		prescriptionsData:[],
		reportsData:[],
		chartsData:[],
		jsbloodsugarvalues:[],
		jsbloodsugarvaluesfast:[],
		jsbloodpressurevaluessystolic:[],
		jsbloodpressurevaluesdystolic:[],
		jstime:[]
	})

	const fetchData = () => {
		fetch('/apiGET/dashboard',{
			credentials:'include',
			headers:{
				'Content-Type':'application/json',
				'authorization':`Bearer ${localStorage.getItem('token')}`
			}
		}).then(res=>res.json())
		.then(data=>{
			setPrescriptions(data)
		})
	}

	useEffect(()=>{
		fetchData()
	},[])

	return(
	<div className="container" style={{backgroundColor: 'white', 
	margin: '40px auto 80px auto', padding: '40px', border: 'solid lightgray 1px',
	 borderStyle: 'groove', borderRadius: '20px'}}>
		<div className="row">
			<div className="col-xl-8">
				<Typography variant="h4" style={{marginBottom:'9px'}}>Prescriptions</Typography>
				<Prescriptions prescriptionsData={prescriptions.prescriptionsData}/>
				<Typography variant="h4" style={{marginTop:'40px',marginBottom:'9px'}} id="reports">Reports</Typography>
					<Reports reportsData={prescriptions.reportsData}/>
				{
					(prescriptions.bloodpressureexcess)?
					(
			<div>	
				<p>
                <a className="card card-body" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" id="ogLink" style={{marginTop:'20px'}}>
                We have seen some spikes in your recent blood pressure readings<br/>
                Want to know ways to control Blood Pressure?
                </a>
            </p>
            <div className="collapse" id="collapseExample" style={{fontSize:'14px'}}>
                <ol className="list-group">
                <li className="list-group-item">Lose extra pounds and watch your waistline. Blood pressure often increases as weight increases.</li> 
                <li className="list-group-item">Exercise regularly.</li> 
                <li className="list-group-item">Eat a healthy diet.</li> 
                <li className="list-group-item">Reduce sodium in your diet.</li> 
                <li className="list-group-item">Limit the amount of alcohol you drink.</li> 
                <li className="list-group-item">Quit smoking.</li> 
                <li className="list-group-item">Cut back on caffeine.</li> 
                <li className="list-group-item">Reduce your stress.</li>
                </ol>
            </div>
            </div>
					)
					:
					null
				}	
			</div>
			<div className="col-xl-4">
				<Typography variant="h4" id="charts" style={{marginBottom:'0'}}>Statistics</Typography>
				<hr style={{margin:'8px'}}/>
				<Charts 
				jsbloodpressurevaluessystolic={prescriptions.jsbloodpressurevaluessystolic}
				jsbloodpressurevaluesdystolic={prescriptions.jsbloodpressurevaluesdystolic}
				jsbloodsugarvaluesfast={prescriptions.jsbloodsugarvaluesfast}
				jsbloodsugarvalues={prescriptions.jsbloodsugarvalues}
				jstime={prescriptions.jstime}
				/>
			</div>
		</div>
	</div>
		)
}

export default DashboardPage