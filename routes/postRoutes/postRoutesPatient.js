const express = require('express');
const router = express.Router();

const patientQueries = require('../../queries/patientQueries')

var _ = require('underscore')
const multer = require('multer');
const path = require('path')
 
//AJAX requests
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

router.post('/updatePres', function(req,res){
	let username = req.session.usernamePatient
	patientQueries.updatePrescriptionNumber(username)
	.then(function(){
		res.send('Done')
	}).catch(function(err){
		throw err
	})
})

router.post('/updateReports', function(req,res){
	let username = req.session.usernamePatient
	patientQueries.updateReportNumber(username)
	.then(function(){
		res.send('Done')
	}).catch(function(err){
		throw err
	})
})

module.exports = router