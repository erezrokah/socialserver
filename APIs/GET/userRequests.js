const router = require('express').Router()
const dirTree = require('directory-tree')
const db = require('../../config/dbconfig')
const userQueries = require('../../queries/userQueries')
const fs = require('fs')

router.get('/profileImage',(req,res)=>{
	let uname = req.session.uname
	if(req.session.loggedIn){
		if(req.session.profileStatus==0){
			let file = fs.createReadStream('public/profileimage/default.png')
			file.pipe(res)
		}
		else{
			let file = fs.createReadStream(`public/profileimage/${uname}.png`)
			file.pipe(res)
		}
	}
	else{
		res.sendStatus(404)
	}
})

router.get('/logout',(req,res)=>{
	req.session.destroy()
	res.send({auth:false})
})

module.exports = router