import React,{Component} from 'react'


const Carousel = () => {
		return(
	<div align="center" style={{marginTop:'40px'}}>
	
	<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000" data-pause="false">
		<ol className="carousel-indicators">
    		<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    		<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    		<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  		</ol>
  	<div className="carousel-inner">
    	<div className="carousel-item active">
      		<img className="d-block w-100" src={"images/carousel7.jpg"} alt="First slide"/>
      		<div className="carousel-caption">
      			<h1>All your medical data available to you on your finger tips</h1>
  	  		</div>
    	</div>
    	<div className="carousel-item">
      		<img className="d-block w-100" src={"images/carousel2.jpg"} alt="Second slide"/>
      		<div className="carousel-caption">
      			<h1 >Available on Mobile too</h1>
  	  		</div>
    	</div>
    	<div className="carousel-item">
      		<img className="d-block w-100" src={"images/carousel5.jpg"} alt="Second slide"/>
      		<div className="carousel-caption">
      			<h1>Sign Up Now<br/>
      			</h1>
  	  		</div>
    	</div>
  	</div>
  		<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    		<span className="carousel-control-prev-icon" aria-hidden="true"></span>
    		<span className="sr-only">Previous</span>
  		</a>
  		<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    		<span className="carousel-control-next-icon" aria-hidden="true"></span>
    		<span className="sr-only">Next</span>
  		</a>
	</div>
	</div>
			)
}

export default Carousel