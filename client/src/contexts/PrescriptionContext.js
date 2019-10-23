import React,{useState,createContext} from 'react'

export const PrescriptionContext = createContext()

export const PrescriptionProvider = props => {
	const prescriptionsLocal = JSON.parse(localStorage.getItem('prescriptions'))
	const [prescriptions,setPrescriptions] = useState(
		prescriptionsLocal?prescriptionsLocal:{
		prescriptionsData:[],
		reportsData:[],
		chartsData:[]
	})

	const fetchData = () => {
		fetch('http://localhost:5000/apiGET/dashboard',{
			credentials:'include',
			headers:{
				'Content-Type':'application/json'
			}
		}).then(res=>res.json())
		.then(data=>{
			if(data.login){
				// console.dir(data)
				localStorage.setItem('prescriptions',JSON.stringify(prescriptions))
				setPrescriptions(data)
			}
			else{
				// console.log('You should login first')
			}
		})
	}

	return(
		<PrescriptionContext.Provider value={{prescriptions,fetchData}}>
			{props.children}
		</PrescriptionContext.Provider>
		)


}
