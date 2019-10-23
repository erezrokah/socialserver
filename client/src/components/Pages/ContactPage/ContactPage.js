import React from 'react'
import Footer from '../UniversalComponents/Footer'

class ContactPage extends Component{
	render(){
		return(
			<div>
			<div align="center" className="container" style={{margin: '80px auto 280px auto', backgroundColor: 'white', padding: '20px',  border: 'solid lightgray 1px', borderStyle: 'groove', borderRadius: '5px'}}>
					<h1>Contact Us</h1>
					<p>You can contact us at the following:<br/>
						Contact Number:XXXX-XXXX-XXX<br/>
						Email: XXX@XXX.com
					</p>
				</div>
			<Footer/>
			</div>
			)
	}
}

export default ContactPage