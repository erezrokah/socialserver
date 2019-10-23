import React,{useState,useEffect} from 'react'

const PharmacistInfo = () => {
	const [pharmacistInfo,setPharmacistInfo] = useState([])

	const fetchInfo = () => {
		fetch('/apiGET/pharminfo',{
			credentials:'include',
			headers:{
				'authorization':`Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res=>res.json())
		.then(info=>{
			setPharmacistInfo(info)
		})
	}

	useEffect(()=>{
		fetchInfo()
	},[])

	return(
	<div className="container" style={{backgroundColor: 'white', 
	margin: '40px auto 80px auto', padding: '40px', border: 'solid lightgray 1px',
	 borderStyle: 'groove', borderRadius: '20px'}}>	
		<div className="detail">
			<table className="table table-striped" id="docinfo">
				<thead>
					<tr>
						<th>Name</th>
						<th>Pharmacy/Hospital</th>
						<th>Location</th>
					</tr>
				</thead>
				<tbody>
				{pharmacistInfo.map(pharminfo=>(
					<tr>
						<td>{pharminfo.fnamepharm} {pharminfo.lnamepharm}</td>
						<td>{pharminfo.pharmacy}</td>
						<td>{pharminfo.location}</td>
					</tr>	
					))}
				</tbody>	
			</table>
		</div>
	</div>	
		)
}

export default PharmacistInfo