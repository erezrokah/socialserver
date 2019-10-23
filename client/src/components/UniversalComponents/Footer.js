import React,{Component} from 'react'

class Footer extends Component{
	render(){
		return(
			<footer style={{backgroundColor:'#000080', boxShadow: '0px -2px 5px gray', marginTop:'auto'}}>
				<div className="container" style={{color: 'white' ,padding:'3px'}}>
					<p style={{marginTop: '12px', textAlign:'center'}}>Health Hub Copyright &copy; 2019</p>
				</div>
			</footer>
			)
	}
}

export default Footer