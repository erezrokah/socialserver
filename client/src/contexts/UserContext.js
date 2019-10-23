import React,{useState,createContext} from 'react'

export const UserContext = createContext()

export const UserProvider = props => {
	const userLocal = JSON.parse(localStorage.getItem('user'))
	const [user,setUser] = useState(userLocal?userLocal:{})

	const logout = () => {
		fetch('http://localhost:5000/apiPOST/logout',{
			method:'post',
			credentials:'include',
			headers:{
				'Content-Type':'application/json'
			}
		}).then(res=>res.json())
		.then(res=>{
			localStorage.removeItem('user')
			localStorage.removeItem('prescriptions')
			setUser({})
		})
	}

	return(
		<UserContext.Provider value={{setUser,logout,user}}>
			{props.children}
		</UserContext.Provider>
		)
}