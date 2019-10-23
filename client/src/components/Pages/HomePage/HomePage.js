import React from 'react'
import Carousel from './HomePageComponents/Carousel'
import Features from './HomePageComponents/Features'
import Footer from '../UniversalComponents/Footer'

const HomePage = () => {
		return(
			<div align="center">
				<Carousel/>
				<Features/>
				<Footer/>
			</div>
			)
}

export default HomePage