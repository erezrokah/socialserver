const express = require('express');
const router = express.Router();

const doctorQueries = require('../../queries/doctorQueries')


var _ = require('underscore')
const multer = require('multer');
const path = require('path')

router.post('/prescriptionenter', function(req,res){
	let doctorusername = req.session.usernameDoctor || 'sufyan' 
	var d = new Date()
	var date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}` 
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
		res.send({insert:true})
	})
})

module.exports = router