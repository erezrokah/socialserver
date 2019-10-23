import React,{useContext,useEffect} from 'react'
import SidebarPatient from './SidebarPatient/SidebarPatient'
import {Redirect,Route,Link} from 'react-router-dom'
import {UserContext} from '../../../contexts/UserContext'
import {ThemeContext} from '../../../contexts/ThemeContext'
import {AuthContext} from '../../../contexts/AuthContext'
import '../../UniversalComponents/Sidebar/Layout.css'

export const PatientLayout = ({children}) => {

	return(
		<div>
			<div className="list" id="list">
				<SidebarPatient/>
			</div>

			<div className="dashboard" id="dashboard" style={{display:'flex',alignItems:'center'}}>
			<div className="container">
				{children}
			</div>	
			</div>
		</div>	
		)
}

export const PatientLayoutRoute = ({component:Component,...rest}) => {
	
	const {auth,checkAuth} = useContext(AuthContext)

	// checkAuth()
	//Setting auth to automatically true for the time being in the context

	return(
		<Route {...rest} render={
			(props)=>(
			(auth==true)?
			(
				<PatientLayout>	
					<Component {...props}/>
				</PatientLayout>
			):(<Redirect to="/"/>)	
				)
		}/>
	)
}
