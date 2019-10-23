import React,{useContext} from 'react'
import {Route,Redirect} from 'react-router-dom'
import {UserContext} from '../../contexts/UserContext'

const PrivateRoute = ({component,...rest}) => {

	const {user} = useContext(UserContext)

	return(
		<Route {...rest} render={
			(props)=>(
				(user)?
				(React.createElement(component,props))
				:(<Redirect to={{pathname:"/"}}/>)
			)
		}/>
		)
}

export default PrivateRoute