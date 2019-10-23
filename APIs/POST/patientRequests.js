const express = require('express');
const router = express.Router();

const patientQueries = require('../../queries/patientQueries')

var _ = require('underscore')
const multer = require('multer');
const path = require('path')
 
router.post('/fetchTimeSlots',(req,res)=>{
	const {unamedoc,date} = req.body
	console.log(req.body)
	patientQueries.fetchTimeSlots(unamedoc,date)
	.then((timeSlots)=>{
		console.log(timeSlots)
		res.send({timeSlots})
	})
})

router.post('/enterTimeSlot',(req,res)=>{
	const {unamedoc,date,time} = req.body
	let uname = req.session.usernamePatient
	patientQueries.enterTimeSlot(unamedoc,date,time,uname)
	.then(()=>{
		res.send({insert:true})
	})
})

router.post('/getdocinfo',function(req,res){
	let username = req.body.username
	patientQueries.doctorinforesults(username).then(function(doctorinfoData){
		res.send(doctorinfoData)
	})
})

router.post('/getpharminfo',function(req,res){
	let username = req.body.username
	patientQueries.pharminforesults(username).then(function(pharminfoData){
		res.send(pharminfoData)
	})
})

module.exports = router