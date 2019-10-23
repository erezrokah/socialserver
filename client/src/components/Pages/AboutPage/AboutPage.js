import React from 'react'
import Footer from '../UniversalComponents/Footer'

const AboutPage = () => {
		return(
			<div>
				<div className="container" align="center" style={{margin: '80px auto 280px auto', backgroundColor: 'white', padding: '20px',  border: 'solid lightgray 1px', borderStyle: 'groove', borderRadius: '5px'}}>	
				<h1>About Us</h1>
				<p>This website as of right now is a just a <em>Final Year<br/> Project</em> but who knows maybe in the near
				future<br/> this becomes something great.
				</p>
				<p>
					Contact Number:XXXX-XXXX-XXX<br/>
					Email: XXX@XXX.com
				</p>
				</div>
				<Footer/>
			</div>
			)
	}


export default AboutPage