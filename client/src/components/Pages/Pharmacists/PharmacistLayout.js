import React,{useContext} from 'react'
import SidebarPharmacist from './SidebarPharmacist/SidebarPharmacist'
import {UserContext} from '../../../contexts/UserContext'
import {Route,Redirect,Link} from 'react-router-dom'
import '../../UniversalComponents/Sidebar/Layout.css'
import {AuthContext} from '../../../contexts/AuthContext'

export const PharmacistLayout = ({children}) => {

	const {user} = useContext(UserContext)
	
	return(
		<div>
			<div className="list">
				<SidebarPharmacist/>
			</div>

			<div className="dashboard" style={{display:'flex', flexFlow:'column'}}>
				<div className="container">
				{
					(!user.profileComplete)?
					(
						<div className="alert alert-info" style={{margin:'20px auto 40px auto',
						width:'100%',textAlign:'center'}}>
						Your Profile is not 100% complete. Click on <Link to="/ph">this link</Link> to complete profile
						<a className="close" data-dismiss="alert" style={{cursor:'pointer'}}>
						&times;
						</a>
						</div>
					):(null)
				}
				</div>
				<div className="center container">
					{children}
				</div>
			</div>
		</div>	
		)
}

export const PharmacistLayoutRoute = ({component:Component,...rest}) => {
	
	const {auth,checkAuth} = useContext(AuthContext)

	checkAuth()

	return(
		<Route {...rest} render={
			(props)=>(
			(auth==true)?
			(
			<PharmacistLayout>
				<Component {...props}/>
			</PharmacistLayout>
			)
			:
			(<Redirect to="/"/>)
			)
		}
		/>
	)
}