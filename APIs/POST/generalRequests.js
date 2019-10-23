const express = require('express');
const router = express.Router();

const patientQueries = require('../../queries/patientQueries')
const doctorQueries = require('../../queries/doctorQueries')
const pharmacistQueries = require('../../queries/pharmacistQueries')
const labQueries = require('../../queries/labQueries')
const normalQueries = require('../../queries/normalQueries')

const multer = require('multer');
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var storageProfile = multer.diskStorage({
  destination: './public/profileimage',
  filename: function (req, file, cb){
  	let username = req.session.profile
  		cb(null,`${username}${path.extname(file.originalname)}`)
  }
})
 
var uploadProfile = multer({ storage: storageProfile })

router.post('/signin',function(req,res){
	// req.session.lmao = 'lol'
	// console.log(`lmao${req.session.lmao}`)
	var username = req.body.uname;
	var password = req.body.pwd;
	var person	 = req.body.person;
	var rememberMe = req.body.rememberMe
	let profileComplete = true
	console.log(req.body)
	switch(person){
		case 'patient':
			patientQueries.patSpecificInfo(username)
			.then(function(rows){
				console.log(rows)
				if(rows.length){
					if(bcrypt.compareSync(password,rows[0].pwd)){
						req.session.loggedIn = true
						req.session.loggedInAsPatient = true
						req.session.usernamePatient = username
						req.session.profileStatus = rows[0].profileStatus
						let user = {
							uname:rows[0].unamepat,
							fname:rows[0].fnamepat,
							lname:rows[0].lnamepat,
							person:'patient'
						}
						req.session.user = user
						if(rememberMe==true){
							req.session.cookie.maxAge = 1000*60*60*2
						}
						jwt.sign({user},'secretkey',(err,token)=>{
							res.send({login:'success',user,token})
						})
					}
					else{
						res.send({login:'error'})
					}
				}
				else{
					res.send({login:'error'})	
				}
			}).catch(function(err){
				throw err
			})
			break
		case 'doctor':
			doctorQueries.docSpecificInfo(username)
			.then(function(rows){
				console.log(rows)
				if(rows.length){
					if(bcrypt.compareSync(password,rows[0].pwd)){
						for(let key in rows[0]){
							if(rows[0][key]==null){
								profileComplete = false
							}
							console.log(rows[0][key])
						}
						req.session.loggedIn = true
						req.session.loggedInAsDoctor = true
						req.session.usernameDoctor = username
						req.session.profileStatus = rows[0].profileStatus
						let user = {
							uname:rows[0].unamedoc,
							fname:rows[0].fnamedoc,
							lname:rows[0].lnamedoc,
							department:rows[0].department,
							qualification:rows[0].qualification,
							phoneNo:rows[0].phone_number,
							hospitalName:rows[0].hospitalName,
							location:rows[0].location,
							timing:rows[0].timing,
							person:'doctor',
							profileComplete
						}
						if(rememberMe==true){
							req.session.cookie.maxAge = 1000*60*60*2
						}
						req.session.user = user
						jwt.sign({user},'secretkey',(err,token)=>{
							res.send({login:'success',user,token})
						})
					}
					else{
						res.send({login:'error'})
					}
				}
				else{
					res.send({login:'error'})	
				}
			}).catch(function(err){
				throw err
			})
			break
		case 'pharmacist':
			pharmacistQueries.pharmSpecificInfo(username)
			.then(function(rows){
				if(rows.length){
					if(bcrypt.compareSync(password,rows[0].pwd)){
						for(let key in rows[0]){
							if(rows[0][key]==null){
								profileComplete = false
							}
							console.log(rows[0][key])
						}
						req.session.loggedIn = true
						req.session.loggedInAsPharmacist = true
						req.session.usernamePharmacist = username
						req.session.profileStatus = rows[0].profileStatus
						let user = {
							uname:rows[0].unamepharm,
							fname:rows[0].fnamepharm,
							lname:rows[0].lnamepharm,
							pharmacy:rows[0].pharmacy,
							location:rows[0].location,
							person:'pharmacist',
							profileComplete
						}
						if(rememberMe==true){
							req.session.cookie.maxAge = 1000*60*60*2
						}
						req.session.user = user
						jwt.sign({user},'secretkey',(err,token)=>{
							res.send({login:'success',user,token})
						})
					}
					else{
						res.send({login:'error'})
					}
				}
				else{
					res.send({login:'error'})	
				}
			}).catch(function(err){
				throw err
			})
			break
		case 'lab':
			labQueries.labSpecificInfo(username)
			.then(function(rows){
				if(rows.length){
					if(bcrypt.compareSync(password,rows[0].pwd)){
						req.session.loggedIn = true
						req.session.loggedInAsLab = true
						req.session.usernameLab = username
						req.session.profileStatus = rows[0].profileStatus
						let user = {
							uname:rows[0].unamelab,
							fname:rows[0].fnamelab,
							lname:rows[0].lnamelab,
							person:'lab'
						}
						if(rememberMe==true){
							req.session.cookie.maxAge = 1000*60*60*2
						}
						req.session.user = user
						jwt.sign({user},'secretkey',(err,token)=>{
							res.send({login:'success',user,token})
						})
					}
					else{
						res.send({login:'error'})
					}
				}
				else{
					res.send({login:'error'})	
				}
			}).catch(function(err){
				throw err
			})
			break			
	}
});

router.post('/signup',function(req,res){
	let {fname,lname,person,uname,pwd} = req.body
	let profileStatus = 0
	switch(person){
		case 'patient':
			bcrypt.genSalt(10, (err,salt)=>{	
				bcrypt.hash(pwd, salt, (err,hash) =>{
					if(err) throw err
					else{
						pwd = hash
						let paramsPatient = [fname,lname,uname,pwd,profileStatus]
						patientQueries.patSpecificInfo(uname).then(function(rows){
							if(rows.length){
								errors.push({msg:'This username has already been taken'})
								req.flash('error_username','Username has already been taken. Enter a new one')
								res.send({signup:'username'})
							}
							else{
								patientQueries.signupPatient(paramsPatient)
								.then(function(){
									req.session.profilePerson = person
									req.session.profile = uname
									res.send({signup:'success'})
								})
							}
						})
				}		
			})
		})						
			break;
		case 'doctor':
			/*let departmentDoctor = req.body.department
			let hospitalDoctor = req.body.hospitalName
			let locationDoctor = req.body.location
			let qualificationDoctor = req.body.qualification
			let timingDoctor = req.body.timing
			let phoneNoDoctor = req.body.phoneNo*/
			bcrypt.genSalt(10, (err,salt)=>{	
				bcrypt.hash(pwd, salt, (err,hash) =>{
					if(err) throw err
					else{
						pwd = hash
						let paramsDoctor = [fname,lname,pwd,uname,profileStatus]
						doctorQueries.docSpecificInfo(uname).then(function(rows){
							if(rows.length){
								errors.push({msg:'This username has already been taken'})
								req.flash('error_username','The username has already been taken')
								res.send({signup:'username'})
							}
							else{
								doctorQueries.signupDoctor(paramsDoctor)
								.then(function(){
									req.session.profilePerson = person
									req.session.profile = uname
									res.send({signup:'success'})
								})
							}
						})
					}	
				})
			})
			break;
		case 'pharmacist':
			/*let pharmacyPharmacist = req.body.pharmacy
			let locationPharmacist = req.body.location*/
			bcrypt.genSalt(10, (err,salt)=>{	
				bcrypt.hash(pwd, salt, (err,hash) =>{
					if(err) throw err
					else{
						pwd = hash
						let paramsPharmacist = [fname,lname,uname,pwd,profileStatus]
						pharmacistQueries.pharmSpecificInfo(uname).then(function(rows){
							if(rows.length){
								errors.push({msg:'This username has already been taken'})
								req.flash('error_username','The username has already been taken')
								res.send({signup:'username'})
							}
							else{
								pharmacistQueries.signupPharmacist(paramsPharmacist)
								.then(function(){
									req.session.profilePerson = person
									req.session.profile = uname
									res.send({signup:'success'})
								})
							}
						})
					}	
				})
			})
			break;
		case 'lab':
			bcrypt.genSalt(10, (err,salt)=>{	
				bcrypt.hash(pwd, salt, (err,hash) =>{
					if(err) throw err
					else{
						pwd = hash
						let paramsLab = [fname,lname,uname,pwd,profileStatus]
						labQueries.labSpecificInfo(uname).then(function(rows){
							if(rows.length){
								errors.push({msg:'This username has already been taken'})
								req.flash('error_username','The username has already been taken')
								res.send({signup:'username'})
							}
							else{
								labQueries.signupLab(paramsLab)
								.then(function(){
									req.session.profilePerson = person
									req.session.profile = uname
									res.send({signup:'success'})
								})
							}
						})
					}	
				})
			})
			break;				
	}
});

router.post('/completeProfile',function(req,res){
	let {fname,lname,person,uname,pwd} = req.body
	switch(person){
		case 'patient':
			bcrypt.genSalt(10, (err,salt)=>{	
				bcrypt.hash(pwd, salt, (err,hash) =>{
					if(err) throw err
					else{
						pwd = hash
						let paramsPatient = [fname,lname,uname,pwd,req.session.user.uname]
						console.log('Params')
						console.log(paramsPatient)
						patientQueries.completeProfilePatient(paramsPatient)
						.then(function(){
							res.send({profileEntered:true})
						})
					}		
				})
			})						
			break;
		case 'doctor':
			let {qualification,department,hospitalName,locationHospital,phoneNo,timing} = req.body
			bcrypt.genSalt(10, (err,salt)=>{	
				bcrypt.hash(pwd, salt, (err,hash)=>{
					if(err) throw err
					else{
						pwd = hash
						let paramsDoctor = [fname,lname,pwd,uname,qualification,department,phoneNo,timing,hospitalName,locationHospital,req.session.user.uname]
						console.log('Params')
						console.log(paramsDoctor)
						doctorQueries.completeProfileDoctor(paramsDoctor)
						.then(function(){
							res.send({profileEntered:true})
						})
					}	
				})
			})
			break;
		case 'pharmacist':
			let {location,pharmacy} = req.body
			bcrypt.genSalt(10, (err,salt)=>{	
				bcrypt.hash(pwd, salt, (err,hash) =>{
					if(err) throw err
					else{
						pwd = hash
						let paramsPharmacist = [fname,lname,uname,pwd,location,pharmacy,req.session.user.uname]
						pharmacistQueries.completeProfilePharmacist(paramsPharmacist)
						.then(function(){
							res.send({profileEntered:true})
						})
					}	
				})
			})
			break;
		case 'lab':
			bcrypt.genSalt(10, (err,salt)=>{	
				bcrypt.hash(pwd, salt, (err,hash) =>{
					if(err) throw err
					else{
						pwd = hash
						let paramsLab = [fname,lname,uname,pwd,profileStatus]
						labQueries.labSpecificInfo(uname).then(function(rows){
							if(rows.length){
								errors.push({msg:'This username has already been taken'})
								req.flash('error_username','The username has already been taken')
								res.send({signup:'username'})
							}
							else{
								labQueries.signupLab(paramsLab)
								.then(function(){
									req.session.profilePerson = person
									req.session.profile = uname
									res.send({signup:'success'})
								})
							}
						})
					}	
				})
			})
			break;				
	}
});

router.post('/profileUpload',uploadProfile.single('file'), function(req,res){
	console.log(req.body)
	let person = req.session.profilePerson
	let username = req.session.profile
	let promise = normalQueries.updateProfile(username,person)
	promise.then(function(){
		req.session.destroy()
		res.send({success:true})
	})
})

router.post('/logout',function(req,res){
	global.authentication = undefined
	req.session.QRcode = undefined
	req.session.destroy()
	res.send({logout:'success'})
});

router.post('/check', (req,res) => {
	switch(req.body.check){
		case 'username':
			normalQueries.usernameCheck(req.body.username,req.body.person)
			.then(function(rows){
				if(rows.length>0){
					res.send(true)
				}
				else{
					res.send(false)
				}
			})
		break
		case 'password':
			if(req.body.pwd == req.body.pwd2){
				res.send(true)
			}
			else{
				res.send(false)
			}
	}
})


module.exports = router