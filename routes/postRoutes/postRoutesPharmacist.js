const express = require('express');
const router = express.Router();

const pharmacistQueries = require('../../queries/pharmacistQueries')

router.post('/prescriptioninfoqrcode',function(req,res){
	let uname = req.body.patientusername
	req.flash('qrcode',uname)
	res.redirect(`/prescriptioninfoqrcode`)
})

module.exports = router