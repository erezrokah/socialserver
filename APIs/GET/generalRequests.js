const router = require('express').Router()
const fs = require('fs')

router.get('/profilePic',(req,res)=>{
	var uname = req.session.usernamePatient || req.session.usernameDoctor
	|| req.session.usernamePharmacist || req.session.usernameLab
	if(req.session.profileStatus){
		var file = fs.createReadStream(`public/profileimage/${uname}.png`)
		file.pipe(res)
	}
	else{
		var file = fs.createReadStream(`public/profileimage/default.png`)
		file.pipe(res)
	}
})

module.exports = router