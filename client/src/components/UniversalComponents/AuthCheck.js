import React,{useContext,useEffect} from 'react'
import {AuthContext} from '../../contexts/AuthContext'

const AuthCheck = () => {
	const {auth,checkAuth} = useContext(AuthContext)

	useEffect(()=>{
		checkAuth()
	},[])

	return null
}

export default AuthCheck