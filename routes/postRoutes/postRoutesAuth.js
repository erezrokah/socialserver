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

var storageProfile = multer.diskStorage({
  destination: './public/profileimage',
  filename: function (req, file, cb){
  	let username = req.session.profile
  		cb(null,`${username}${path.extname(file.originalname)}`)
  }
})
 
var uploadProfile = multer({ storage: storageProfile })

router.post('/lol',(req,res)=>{
	req.session.lmao = 'xD'
	res.send(req.body)
})

router.post('/signin',function(req,res){
	req.session.lmao = 'lol'
	console.log(`lmao${req.session.lmao}`)
	var username = req.body.uname;
	var password = req.body.pwd;
	var person	 = req.body.person;
	switch(person){
		case 'patient':
			patientQueries.patSpecificInfo(username)
			.then(function(rows){
				console.log(rows)
				if(rows.length){
					if(bcrypt.compareSync(password,rows[0].pwd)){
						req.session.user = rows[0]
						req.session.loggedIn = true
						req.session.loggedInAsPatient = true
						req.session.usernamePatient = username
						res.send({login:'success'})
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
						req.session.loggedIn = true
						req.session.loggedInAsDoctor = true
						req.session.usernameDoctor = username
						res.send({login:'success'})
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
						req.session.loggedIn = true
						req.session.loggedInAsPharmacist = true
						req.session.usernamePharmacist = username
						res.send({login:'success'})
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
						res.send({login:'success'})
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
			let departmentDoctor = req.body.departmentDoctor
			let hospitalDoctor = req.body.hospitalDoctor
			let locationDoctor = req.body.locationDoctor
			let qualificationDoctor = req.body.qualificationDoctor
			let timingDoctor = req.body.timingDoctor
			let phoneNoDoctor = req.body.phoneNoDoctor
			bcrypt.genSalt(10, (err,salt)=>{	
				bcrypt.hash(pwd, salt, (err,hash) =>{
					if(err) throw err
					else{
						pwd = hash
						let paramsDoctor = [fname,lname,hospitalDoctor,locationDoctor,departmentDoctor,qualificationDoctor,timingDoctor,phoneNoDoctor,pwd,uname,profileStatus]
						doctorQueries.docSpecificInfo(uname).then(function(rows){
							if(rows.length){
								errors.push({msg:'This username has already been taken'})
								req.flash('error_username','The username has already been taken')
								res.send({signup:'username'})
							}
							else{
								doctorQueries.signupDoctor(paramsDoctor)
								.then(function(){
									req.session.profileDoctor = person
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
			let pharmacyPharmacist = req.body.pharmacyPharmacist
			let locationPharmacist = req.body.locationPharmacist;
			bcrypt.genSalt(10, (err,salt)=>{	
				bcrypt.hash(pwd, salt, (err,hash) =>{
					if(err) throw err
					else{
						pwd = hash
						let paramsPharmacist = [fname,lname,uname,pwd,pharmacyPharmacist,locationPharmacist,profileStatus]
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

router.post('/profileUpload',uploadProfile.single('image'), function(req,res){
	let person = req.session.profilePerson
	let username = req.session.profile
	let promise = normalQueries.updateProfile(username,person)
	promise.then(function(){
		req.session.destroy()
		res.redirect('/signin?account=true')
	})
})

router.post('/logout',function(req,res){
	global.authentication = undefined
	res.locals.session.QRcode = undefined
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