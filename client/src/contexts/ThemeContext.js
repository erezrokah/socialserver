import React,{useState,createContext} from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = props => {

	const [theme,setTheme] = useState({
		isLight:true,
		lightTheme:{
			bg:'white',
			texture:'rgb(0,0,0,0.05)',
			color:'black',
			link:'#007bff',
			bg2:'#f4f4f4',
			borderCol:'lightgray'
		},
		darkTheme:{
			bg:'black',
			texture:'#333',
			color:'white',
			link:'purple',
			bg2:'#ccc',
			borderCol:'gray'
		}
	})

	const toggleTheme = () => {
		setTheme({...theme,isLight:!theme.isLight})
	}

	return(
		<ThemeContext.Provider value={{theme,toggleTheme}}>
			{props.children}
		</ThemeContext.Provider>
		)
}