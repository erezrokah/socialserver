const router = require('express').Router()
const db = require('../../config/dbconfig')
const multer = require('multer');
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userQueries = require('../../queries/userQueries')


router.post('/signin',(req,res)=>{
	let {uname,pwd,rememberMe} = req.body
	console.log(`req.body`)
	console.log(req.body)
	userQueries.userSpecificInfo(uname)
			.then(function(rows){
				console.log(rows)
				if(rows.length>0){
					if(rows[0].pwd==pwd){
						req.session.loggedIn = true
						req.session.uname = uname
						req.session.profileStatus = rows[0].profileStatus
						let user = {
							uname:rows[0].uname,
							fname:rows[0].fname,
							lname:rows[0].lname
						}
						req.session.user = user
						if(rememberMe==true){
							req.session.cookie.maxAge = 1000*60*60*24
						}
						console.log(user)
						res.send({auth:true,user})
						/*jwt.sign({user},'secretkey',(err,token)=>{
							res.send({login:'success',user,token})
						})*/
					}
					else{
						res.send({auth:false})
					}
				}
				else{
					res.send({auth:false})	
				}
			}).catch(function(err){
				throw err
			})
})

module.exports = router