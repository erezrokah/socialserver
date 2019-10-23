import React,{Component} from 'react'

const Features = () => {
		return(
			<div className="container"  style={{backgroundColor: 'white', 
			margin: '80px auto', padding: '40px', border: 'solid lightgray 1px', 
			borderStyle: 'groove', borderRadius: '20px'}}>
				<div className="deliverables">
					<div className="row">
						<div className="col-md-4 box">
							<img src={"images/Ease_of_Access.png"} height="100px" 
							width="100px" alt=""/>
							<h3>Ease in Mangement</h3>
							<p>Online Medical Management System has all your 
							medical data present online so that you don't have 
							to manage large files of your medical data</p>
						</div>
						<div className="col-md-4 box">
							<img src={"images/statistics.png"} height="100px" width="100px" 
							alt=""/>
							<h3>Statistical Data</h3>
							<p>Previous data trends like blood pressure and blood sugar 
							are plotted in the form of graphs so that you can keep track
							of your vitals</p>
						</div>
						<div className="col-md-4 box">
							<img src={"images/qrcode.png"} height="100px" width="100px" alt=""/>
							<h3>QRcode Authentication</h3>
							<p>Don't worry about anyone peeking on your data. 
							Our system uses QRCodes to give access to the pharmacist and 
							doctor just for the time being</p>
						</div>	
					</div>
				</div>
			</div>
			)
}

export default Features