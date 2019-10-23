import React from 'react'
const Reports = props => (
		<div className="table-responsive">
			<table className="table table-striped" id="reportsTable">
			<thead>
	            <tr id='heading'>
		            <th>Test Name</th>
		            <th>Department</th>
		            <th>Date</th>
		            <th>Report</th>
	            </tr>
            </thead>
            <tbody>
			{props.reportsData.map(report=>(
				<tr>
					<td>{report.testname}</td>
					<td>{report.department}</td>
					<td>{report.dateofreport}</td>
					<td><a>Download</a></td>
				</tr>
				))}
			</tbody>		
			</table>
		</div>	
		)


export default Reports