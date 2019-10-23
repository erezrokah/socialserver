const express = require('express');
const router = express.Router();

//Queries
const patientQueries = require('../../queries/patientQueries')
const doctorQueries = require('../../queries/doctorQueries')
const pharmacistQueries = require('../../queries/pharmacistQueries')

const redirectRoutes = require('../routesRedirect')
const multer = require('multer')
const path = require('path')

const profileStatus = (req,res,next) => {
	if(req.session.usernamePatient){
		const username = req.session.usernamePatient
		patientQueries.profile(username)
		.then(function(rows){
			if(rows[0].profileStatus==0){
				var profilePic = false;
			}
			else{
				var profilePic = true;
			}
			res.locals.profilePic = profilePic
			next() 
		})
	}
	else{
		next()
	}
}

const unseenPrescriptions = (req,res,next) => {
	patientQueries.unseenPrescripitons(req.session.usernamePatient)
	.then(function(no){
		if(no>0){
			res.locals.prescriptionBadge = true
			res.locals.unseenPrescripitons = no
		}
		else{
			res.locals.prescriptionBadge = false
		}
		next()
	}).catch(function(err){
		throw err
	})
}

const unseenReports = (req,res,next) => {
	patientQueries.unseenReports(req.session.usernamePatient)
	.then(function(no){
		if(no>0){
			res.locals.reportBadge = true
			res.locals.unseenReports = no
		}
		else{
			res.locals.reportBadge = false
		}
		next()
	}).catch(function(err){
		throw err
	})
}


const checkBP = function(req,res,next){
	var countBP = 0
	patientQueries.dashboardCharts(req.session.usernamePatient)
	.then(function(chartsData){
		chartsData.forEach(function(item){
				if(item.bloodpressuredystolic<140 && item.bloodpressuredystolic>120){

					}
				else{
					countBP++
				}
				})
				if(countBP>=2){
					res.locals.bloodpressureexcess = true
				}
				next()
	})
}

//Routes
router.get('/dashboard',redirectRoutes.redirectLogin,profileStatus,unseenPrescriptions,
	checkBP,unseenReports,function(req,res,next){
	let username = req.session.usernamePatient || req.body.username
	var promise = patientQueries.dashboardPrescriptions(username)
	promise.then(function(prescriptions){
		var prescriptionsData = prescriptions
		return patientQueries.dashboardReports(username).then(function(reports){
			var reportsData = reports
			return patientQueries.dashboardCharts(username).then(function(charts){
				var chartsData = charts
				var checkupdates = []
				var jsbloodpressurevaluessystolic = []
				var jsbloodpressurevaluesdystolic = []
				var jsbloodsugarvaluesfast = []
				var jsbloodsugarvalues = []
				var jstime = []
				let count = 0
				let i = 0
				let countOfEntries = [0,0,0,0,0]
				let bloodpreesureexcess = false
				chartsData.forEach(function(item){
					if(i<4){
						jsbloodpressurevaluesdystolic.push(item.bloodpressuredystolic)
						jsbloodpressurevaluessystolic.push(item.bloodpressuresystolic)
						jsbloodsugarvaluesfast.push(item.bloodsugarfast)
						jsbloodsugarvalues.push(item.bloodsugar)
						jstime.push(item.dateofprescription)
					}
					else{

					}
					i++
				})

				////////////////////////////////////////////
				///////////Do something about it////////////
				////////////////////////////////////////////

				/*let jsbloodpressurevaluesdystolic = jsbloodpressurevaluesdystolic.filter(item => {
    				return item!=null;
				});
				let jsbloodpressurevaluesdystolic = jsbloodpressurevaluesdystolic.filter(item => {
    				return item!=null;
				});
				let jsbloodpressurevaluesdystolic = jsbloodpressurevaluesdystolic.filter(item => {
    				return item!=null;
				});
				let jsbloodpressurevaluesdystolic = jsbloodpressurevaluesdystolic.filter(item => {
    				return item!=null;
				});*/
				res.send({chartsData,prescriptionsData,reportsData,jsbloodpressurevaluesdystolic,
					jsbloodpressurevaluessystolic,jsbloodsugarvaluesfast,jsbloodsugarvalues,bloodpreesureexcess,
					jstime,login:true})
				}).catch(function(err){
					throw err
				})
		}).catch(function(err){
			throw err
		})
	}).catch(function(err){
		throw err
	})
});

router.get('/profile',redirectRoutes.redirectLogin,profileStatus,unseenPrescriptions,
	checkBP,unseenReports,function(req,res,next){
	let username = res.locals.session.usernamePatient
	patientQueries.profile(username)
	.then(function(rows){
		if(rows[0].profileStatus==0){
			var profilePic = false;
		}
		else{
			var profilePic = true;
		}
		res.send({profile:rows})
	})
});

router.get('/doctorinfo',redirectRoutes.redirectLogin,profileStatus,unseenPrescriptions,
	checkBP,unseenReports,function(req,res,next){
	// let promise = doctorQueries.docinfo()
	// promise.then(function(doctorinfo){
	// 	return patientQueries.doctorinforesults(req.query.username).then(function(doctorinfoData){
	// 		res.render('patient/doctorinfo',{doctorinfo,doctorinfoData})
	// 	})
	// })
	doctorQueries.docinfo()
	.then(function(doctorinfo){
		res.send({doctorinfo})
	})
});

router.get('/pharminfo',redirectRoutes.redirectLogin,profileStatus,unseenPrescriptions,
	checkBP,unseenReports,function(req,res,next){
	pharmacistQueries.pharminfo()
	.then(function(pharminfo){
		res.send({pharminfo})
	})
});

router.get('/prescriptionDetailed',redirectRoutes.redirectAll,profileStatus,unseenPrescriptions,
	checkBP,unseenReports,function(req,res){
	let id = req.query.id
	let promise = patientQueries.prescriptionDetailed(id)
	promise.then(function(item){
		item[0].profilePic = res.locals.profilePic
		console.log(item[0])
		res.send({data:item[0]})
	})
})



module.exports = router