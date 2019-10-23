import React from 'react'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';

const Prescriptions = props => (
		<div className="table-responsive">
			<table className="table table-striped" id="prescriptionsTable">
			<thead>
			<tr id='heading'>
	            <th>Doctor Name</th>
	            <th>Department</th>
	            <th>Date</th>
	            <th id="prepHeading" tabindex="0" data-toggle="popover" 
	            data-placement="top" data-trigger="focus" 
	            data-content="Click on the hyperlink to view the full prescription">
	            Prescription
	            </th>
			</tr>
			</thead>
			<tbody>
			{props.prescriptionsData.map(prescription=>(
				<tr>
					<td>{prescription.fnamedoc}</td>
					<td>{prescription.department}</td>
					<td>{prescription.dateofprescription}</td>
					<td><Link to={{
						pathname:`/detailedPrescription/${prescription.id}`,
						state:{prescription}
				}}>
					{prescription.prescriptionpart}</Link></td>
				</tr>
				))}
			</tbody>		
			</table>
		</div>	
)


export default Prescriptions