const express = require('express');
const router = express.Router();

const pharmacistQueries = require('../../queries/pharmacistQueries')

const redirectRoutes = require('../loginRedirect')
var _ = require('underscore')
const multer = require('multer');
const path = require('path')

function authmiddlewarePrescription(req,res,next){
	if(_.isUndefined(global.authentication)){
		next()
	}
	else{
		let username = req.query.usernameQR
		req.flash('username',username)
		res.locals.session.QRcode = true
		res.redirect(`/prescriptions`)
	}
}

router.get('/prescriptioninfoqrcode',redirectRoutes.redirectLogin,authmiddlewarePrescription,function(req,res){
	let usernameQR = req.flash('qrcode')
	res.render('pharmacist/prescriptioninfoqrcode',{usernameQR})
})

router.get('/prescriptions',redirectRoutes.redirectLogin,function(req,res){
	let username = req.flash('username')
	let promise = pharmacistQueries.prescriptioninfo(username)
	promise.then(function(prescriptions){
		res.render('pharmacist/prescriptions',{prescriptions})
	})
})

module.exports = router