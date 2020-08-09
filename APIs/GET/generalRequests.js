const router = require('express').Router()
const dirTree = require('directory-tree')
const db = require('../../config/dbconfig')

router.get('/checkAuth',(req,res)=>{
	if(req.session.loggedIn==true){
		res.send({auth:true})
	}
	else{
		res.send({auth:false})
	}
})

module.exports = router