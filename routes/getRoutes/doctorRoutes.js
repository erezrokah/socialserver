const express = require('express');
const router = express.Router();
//Queries
const doctorQueries = require('../../queries/doctorQueries')
const patientQueries = require('../../queries/patientQueries')

const redirectRoutes = require('../routesRedirect')
var _ = require('underscore')
const multer = require('multer');
const path = require('path')

function authmiddleware(req,res,next){
	if(_.isUndefined(global.authentication)){
		next()
	}
	else{
		let username = req.query.usernameQR
		res.locals.session.QRcode = true
		req.session('username',username)
		res.redirect(`/dashboardDoctor`)
	}
}

router.get('/patientinfo',redirectRoutes.redirectLogin ,function(req,res){
	res.render('doctor/patientinfo')
});
router.get('/patientinfoqrcode',redirectRoutes.redirectLogin,authmiddleware,function(req,res,next){
	let usernameQR = req.flash('qrcode')
	res.render('doctor/patientinfoqrcode',{usernameQR})
});

router.get('/dashboardDoctor',redirectRoutes.redirectLogin,function(req,res,next){
	let username = req.session.usernamePatient || req.flash('username')
	var promise = patientQueries.dashboardPrescriptions(username)
	promise.then(function(prescriptions){
		var prescriptionsData = prescriptions
		// console.log(prescriptionsData)
		return patientQueries.dashboardReports(username).then(function(reports){
			var reportsData = reports
			// console.log(reportsData)
			return patientQueries.dashboardCharts(username).then(function(charts){
				var chartsData = charts
				var checkupdates = []
				var jsbloodpressurevaluessystolic = []
				var jsbloodpressurevaluesdystolic = []
				var jsbloodsugarvaluesfast = []
				var jsbloodsugarvalues = []
				var jstime = []
				let count = 0
				let countOfEntries = 0
				let bloodpreesureexcess = false
				chartsData.forEach(function(item){
					if(countOfEntries<4){
						jsbloodpressurevaluesdystolic.push(item.bloodpressuredystolic)
						jsbloodpressurevaluessystolic.push(item.bloodpressuresystolic)
						jsbloodsugarvaluesfast.push(item.bloodsugarfast)
						jsbloodsugarvalues.push(item.bloodsugar)
						jstime.push(item.dateofprescription)
					}
					countOfEntries++
				})
				jsbloodpressurevaluesdystolic.forEach(function(item){
					if(item<140 && item>120)
					{
					}
					else{
						count++
					}
				})
				if(count>=2){
					bloodpreesureexcess = true
				}
				// console.log(chartsData)
				jsbloodpressurevaluesdystolic = jsbloodpressurevaluesdystolic.toString()
				jsbloodpressurevaluessystolic = jsbloodpressurevaluessystolic.toString()
				jsbloodsugarvalues = jsbloodsugarvalues.toString()
				jsbloodsugarvaluesfast = jsbloodsugarvaluesfast.toString()
				jstime = jstime.toString()
				res.send({chartsData,prescriptionsData,reportsData,jsbloodpressurevaluesdystolic,
					jsbloodpressurevaluessystolic,jsbloodsugarvaluesfast,jsbloodsugarvalues,bloodpreesureexcess,
					jstime})
				})
		})
	})
});

router.get('/prescriptionenter',redirectRoutes.redirectLogin,function(req,res){
	let entered = req.query.insert		
	res.render('doctor/prescriptionenter',{entered});
});

module.exports = router