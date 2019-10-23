const express = require('express');
const router = express.Router();

const pharmacistQueries = require('../../queries/pharmacistQueries')

const redirectRoutes = require('../routesRedirect')
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

/*router.get('/prescriptions',redirectRoutes.redirectLogin,function(req,res){
	let username = req.flash('username')
	let promise = pharmacistQueries.prescriptioninfo(username)
	promise.then(function(prescriptions){
		res.render('pharmacist/prescriptions',{prescriptions})
	})
})
*/

module.exports = router