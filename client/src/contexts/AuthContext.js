import React,{useState,createContext,useContext} from 'react'
import {UserContext} from './UserContext'

export const AuthContext = createContext()

export const AuthProvider = props => {
	const [auth,setAuth] = useState(true)
	// const {user,setUser} = useContext(UserContext)

	const checkAuth = () => {
		fetch('/apiAuth/checkAuth',{
			credentials:'include',
			headers:{
				'Content-Type':'application/json'
			}
		})
		.then(res=>res.json())
		.then(res=>{
			console.log(res)
			setAuth(res.auth)
			if(!res.auth){
				// setUser({})
				localStorage.removeItem('user')
			}
		})
	}

	return(
		<AuthContext.Provider value={{auth,checkAuth,setAuth}}>
			{props.children}
		</AuthContext.Provider>
		)
}