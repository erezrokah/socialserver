/*const redirectLoggedIn = (req,res,next) => {
	if(req.session.loggedInAsPatient){
		res.redirect('/dashboard')
	}
	else if(req.session.loggedInAsDoctor){
		res.redirect('/prescriptionenter')
	}
	else if(req.session.loggedInAsPharmacist){
		res.redirect('/prescriptioninfo')
	}
	else if(req.session.loggedInAsLab){
		res.redirect('/reportUpload')
	}
	else{
		next()
	}
}*/


const redirectLogin = (req,res,next)=>{
	if(!req.session.loggedIn){
		res.send({login:false})
	}
	else{
		next()
	}
}

const redirectHome = (req,res,next)=>{
	if(req.session.loggedIn){
		res.redirect('/')
	}
	else{
		next()
	}
}

const redirectAll = (req,res,next)=>{
	if(!req.session.loggedIn){
		res.redirect('/')
	}
	else{
		next()
	}
}


redirect = {
	redirectHome,
	redirectLogin,
	redirectAll,
}

module.exports = redirect