const express = require('express');
const router = express.Router();

const doctorQueries = require('../../queries/doctorQueries')


var _ = require('underscore')
const multer = require('multer');
const path = require('path')

router.post('/prescriptionenter', function(req,res){
	let doctorusername = res.locals.session.usernameDoctor 
	var d = new Date()
	var date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` 
	var readStatus = 0

	let values = [
	req.body.patientusername,
	doctorusername,
	date,
	req.body.diagnosis,
	req.body.investigation,
	req.body.referral,
	req.body.comments,
	req.body.bloodpressuresystolic,
	req.body.bloodpressuredystolic,
	req.body.bloodsugar,
	req.body.bloodsugarfast,
	req.body.presentingcomplaints,
	req.body.patientencounter,
	req.body.advice,
	req.body.followup,
	req.body.medicines,
	readStatus
	]

	let promise = doctorQueries.doctorPrescriptionEnterInsert(values)
	promise.then(function(){
		res.redirect(`/prescriptionenter?insert=${true}`)
	})
})

router.post('/patientinfoqrcode', function(req,res){
	let usernameQR = req.body.patientusername
	req.flash('qrcode',usernameQR)
	res.redirect(`/patientinfoqrcode`)
})

module.exports = router