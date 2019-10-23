const router = require('express').Router()

router.get('/checkAuth',(req,res)=>{
	console.log('Check Route Accessed')
	if(!req.session.loggedIn){
		console.log(false)
		res.send({auth:false})
	}
	else{
		console.log(true)
		res.send({auth:true})
	}
})

module.exports = router