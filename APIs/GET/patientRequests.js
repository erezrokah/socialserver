const express = require('express');
const router = express.Router();

//Queries
const patientQueries = require('../../queries/patientQueries')
const doctorQueries = require('../../queries/doctorQueries')
const pharmacistQueries = require('../../queries/pharmacistQueries')

const redirectFunctions = require('../loginRedirect')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const unseenPrescriptions = (req,res,next) => {
	patientQueries.unseenPrescripitons(req.session.usernamePatient)
	.then(function(no){
		console.log('Unseen Prescriptions ',no)
		if(no>0){
			req.prescriptionBadge = true
			req.unseenPrescripitons = no
		}
		else{
			req.prescriptionBadge = false
		}
		next()
	}).catch(function(err){
		throw err
	})
}

const unseenReports = (req,res,next) => {
	patientQueries.unseenReports(req.session.usernamePatient)
	.then(function(no){
		console.log('Unseen Reports')
		if(no>0){
			req.reportBadge = true
			req.unseenReports = no
		}
		else{
			req.reportBadge = false
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
					req.bloodpressureexcess = true
				}
				else{
					req.bloodpressureexcess = false
				}
				next()
	})
}

//Routes
router.get('/sidebarinfo',unseenPrescriptions,checkBP,unseenReports,(req,res)=>{
	console.log({
		unseenPrescriptions:req.unseenPrescripitons,
		bloodpressureexcess:req.bloodpressureexcess,
		unseenReports:req.unseenReports,
		reportBadge:req.reportBadge,
		prescriptionBadge:req.prescriptionBadge						
	})
	res.send({
		unseenPrescriptions:req.unseenPrescripitons,
		bloodpressureexcess:req.bloodpressureexcess,
		unseenReports:req.unseenReports,
		reportBadge:req.reportBadge,
		prescriptionBadge:req.prescriptionBadge						
	})
})

router.get('/dashboard', redirectFunctions.redirectLogin,checkBP,function(req,res){
	console.log('Accessed Dashboard Route')
	let username = req.session.usernamePatient
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
				console.log('Sending Response')
				res.send({chartsData,prescriptionsData,reportsData,jsbloodpressurevaluesdystolic,
					jsbloodpressurevaluessystolic,jsbloodsugarvaluesfast,jsbloodsugarvalues,bloodpreesureexcess,
					jstime,login:true,bloodpressureexcess:req.bloodpressureexcess})
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

router.get('/profile',function(req,res){
	let username = req.session.usernamePatient
	patientQueries.profile(username)
	.then(function(rows){
		/*if(rows[0].profileStatus==0){
			var profilePic = false;
		}
		else{
			var profilePic = true;
		}*/
		res.send({profile:rows})
	})
});

router.get('/doctorinfo',function(req,res){
	// let promise = doctorQueries.docinfo()
	// promise.then(function(doctorinfo){
	// 	return patientQueries.doctorinforesults(req.query.username).then(function(doctorinfoData){
	// 		res.render('patient/doctorinfo',{doctorinfo,doctorinfoData})
	// 	})
	// })
	doctorQueries.docinfo()
	.then(function(doctorinfo){
		res.send(doctorinfo)
	})
});

router.get('/pharminfo',function(req,res){
	pharmacistQueries.pharminfo()
	.then(function(pharminfo){
		res.send(pharminfo)
	})
});

router.get('/prescriptionDetailed',function(req,res){
	let id = req.query.id
	let promise = patientQueries.prescriptionDetailed(id)
	promise.then(function(item){
		item[0].profilePic = req.profilePic
		console.log(item[0])
		res.send({data:item[0]})
	})
})

router.get('/updatePres', function(req,res){
	let username = req.session.usernamePatient
	patientQueries.updatePrescriptionNumber(username)
	.then(function(){
		res.send({status:'updated'})
	}).catch(function(err){
		throw err
	})
})

router.get('/updateReports', function(req,res){
	let username = req.session.usernamePatient
	patientQueries.updateReportNumber(username)
	.then(function(){
		res.send({status:'updated'})
	}).catch(function(err){
		throw err
	})
})



module.exports = router