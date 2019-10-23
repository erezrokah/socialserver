const express = require('express');
const router = express.Router();
//Queries
const patientQueries = require('../queries/patientQueries')
const doctorQueries = require('../queries/doctorQueries')
const pharmacistQueries = require('../queries/pharmacistQueries')
const labQueries = require('../queries/labQueries')

const redirectRoutes = require('./routesRedirect')
const url = require('url')
var Busboy = require('busboy');
var fs = require('fs')
var _ = require('underscore')
const multer = require('multer');
const path = require('path')
var storageReports = multer.diskStorage({
  destination: './public/reports',
  filename: function (req, file, cb){
  	let promise = labQueries.reportCount(req.body.patientUsername)
  	promise.then(function(record){
  		let count = record.length + 1
  		cb(null,`report${req.body.patientUsername}${count}${path.extname(file.originalname)}`)
  	})
  }
})
 
var uploadReports = multer({ storage: storageReports })

var storageProfile = multer.diskStorage({
  destination: './public/profileimage',
  filename: function (req, file, cb){
  	let username = req.session.profile
  		cb(null,`${username}${path.extname(file.originalname)}`)
  }
})
 
var uploadProfile = multer({ storage: storageProfile })

function authmiddleware(req,res,next){
	if(_.isUndefined(global.authentication)){
		next()
	}
	else{
		let username = req.query.usernameQR
		res.locals.session.QRcode = true
		res.redirect(`/dashboardDoctor?usernamePatient=${username}`)
	}
}

function authmiddlewarePrescription(req,res,next){
	if(_.isUndefined(global.authentication)){
		next()
	}
	else{
		let username = req.query.usernameQR
		res.locals.session.QRcode = true
		// console.log(global.authentication)
		// console.log(res.locals.QRcode)
		res.redirect(`/prescriptions?usernamePatient=${username}`)
	}
}

//Routes for all
router.get('/',function(req,res,next){
	res.render('index');
});

router.get('/contact',function(req,res,next){
	res.render('contact');
});

router.get('/about',function(req,res,next){
	res.render('about');
});

//Patient Routes
router.get('/dashboard',redirectRoutes.redirectLoginPatient,function(req,res,next){
	let username = res.locals.session.usernamePatient || req.query.usernamePatient;
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
				jsbloodpressurevaluesdystolic = jsbloodpressurevaluesdystolic.toString()
				jsbloodpressurevaluessystolic = jsbloodpressurevaluessystolic.toString()
				jsbloodsugarvalues = jsbloodsugarvalues.toString()
				jsbloodsugarvaluesfast = jsbloodsugarvaluesfast.toString()
				jstime = jstime.toString()
				res.render('patient/dashboard',{chartsData,prescriptionsData,reportsData,jsbloodpressurevaluesdystolic,
					jsbloodpressurevaluessystolic,jsbloodsugarvaluesfast,jsbloodsugarvalues,bloodpreesureexcess,
					jstime})
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

router.get('/dashboardDoctor',redirectRoutes.redirectLoginDoctor,function(req,res,next){
	let username = res.locals.session.usernamePatient || req.query.usernamePatient;
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
				res.render('patient/dashboard',{chartsData,prescriptionsData,reportsData,jsbloodpressurevaluesdystolic,
					jsbloodpressurevaluessystolic,jsbloodsugarvaluesfast,jsbloodsugarvalues,bloodpreesureexcess,
					jstime})
				})
		})
	})
});

router.get('/profile',redirectRoutes.redirectLoginPatient,function(req,res,next){
	let username = res.locals.session.usernamePatient
	let promise = patientQueries.profile(username)
	promise.then(function(rows){
		if(rows[0].profileStatus==0){
			var profilePic = false;
		}
		else{
			var profilePic = true;
		}
		res.render('patient/profile',{profile:rows,profilePic})
	})
});

router.get('/doctorinfo',redirectRoutes.redirectLoginPatient,function(req,res,next){
	let promise = doctorQueries.docinfo()
	promise.then(function(doctorinfo){
		return patientQueries.doctorinforesults(req.query.username).then(function(doctorinfoData){
			res.render('patient/doctorinfo',{doctorinfo,doctorinfoData})
		})
	})
});

router.get('/pharminfo',redirectRoutes.redirectLoginPatient,function(req,res,next){
	let promise = pharmacistQueries.pharminfo()
	promise.then(function(pharminfo){
		return patientQueries.pharminforesults(req.query.username).then(function(pharminfoData){
			res.render('patient/pharminfo',{pharminfo,pharminfoData})
		})
	})
});

router.get('/prescriptionDetailed',redirectRoutes.redirectAll,function(req,res){
	let id = req.query.id
	let promise = patientQueries.prescriptionDetailed(id)
	promise.then(function(item){
		res.render('patient/prescriptionDetailed',{data:item})
	})
})


//Doctor Routes
router.get('/patientinfo',redirectRoutes.redirectLoginDoctor ,function(req,res){
	res.render('doctor/patientinfo')
});
router.get('/patientinfoqrcode',redirectRoutes.redirectLoginDoctor,authmiddleware,function(req,res,next){
	let usernameQR = req.query.usernameQR
	res.render('doctor/patientinfoqrcode',{usernameQR})
});

router.get('/prescriptionenter',redirectRoutes.redirectLoginDoctor,function(req,res){
	let entered = req.query.insert		
	res.render('doctor/prescriptionenter',{entered});
});

//Labs Routes
router.get('/reportUpload',redirectRoutes.redirectLoginLab,function(req,res){
	res.render('labs/reportUpload')
})

//Signup and Signin Routes
router.get('/signin', redirectRoutes.redirectHome, function(req,res){
	let successAccount = req.query.account
	let loginError = req.query.loginError
	res.render('signin',{
		successAccount,
		loginError
	});
});

router.get('/signup', redirectRoutes.redirectHome , function(req,res){ 
	res.render('signup');
});

router.get('/signupProfile',function(req,res){
	res.render('profileUpload')
})

router.get('/profileUpload',redirectRoutes.redirectHome,function(req,res){
	res.render('profileUpload')
})

//Form posts
router.post('/sendnotif',function(req,res){
	let presid = req.body.presid
	let unamep = req.body.patientuname
	let location = req.session.locationPharmacist
	let notificationContent = `You can collect your medicines from ${location}`
	let readStatus = 0
	let params = [unamep,notificationContent,presid,readStatus]
	let promise = queries.enterNotification(params)
	promise.then(function(){
		res.redirect('/prescriptions?notif=success')
	})
})

router.post('/signin',function(req,res){
	var username = req.body.uname;
	var password = req.body.pwd;
	var person	 = req.body.person;
	switch(person){
		case 'patient':
			let promise = patientQueries.patinfo()
			let i = 0;
			promise.then(function(info){
				info.forEach(function(item){
					if(item.unamepat == username && item.pwd == password)
					{
						req.session.loggedIn = true
						req.session.loggedInAsPatient = true
						req.session.usernamePatient = username
						res.redirect('/dashboard')
					}
					i++	
				})
				if(i==info.length)
				{
					res.redirect('/signin?loginError=true')
				}
			})

			// res.redirect('/signin')
			break
		case 'doctor':
			let promise1 = doctorQueries.docinfo()
			let j = 0;
			promise1.then(function(info){
				info.forEach(function(item){
					if(item.unamedoc == username && item.pwd == password)
					{
						req.session.loggedIn = true
						req.session.loggedInAsDoctor = true
						req.session.usernameDoctor = username
						res.redirect('/prescriptionenter')
					}
					j++	
				})
				if(j==info.length)
				{
					res.redirect('/signin?loginError=true')
				}
			})
			break
		case 'pharmacist':
			let promise2 = pharmacistQueries.pharminfo()
			let k = 0;
			promise2.then(function(info){
				info.forEach(function(item){
					if(item.unamepharm == username && item.pwd == password)
					{
						req.session.loggedIn = true
						req.session.loggedInAsPharmacist = true
						req.session.usernamePharmacist = username
						req.session.locationPharmacist = item.location
						res.redirect('/prescriptioninfo')
					}
					k++	
				})
				if(k==info.length)
				{
					res.redirect('/signin?loginError=true')
				}
			})
			break
		case 'lab':
			let promise3 = labQueries.labinfo()
			let l = 0;
			promise3.then(function(info){
				info.forEach(function(item){
					if(item.unamelab == username && item.pwd == password)
					{
						req.session.loggedIn = true
						req.session.loggedInAsLab = true
						req.session.usernameLab = username
						res.redirect('/reportUpload')
					}
					l++	
				})
				if(l==info.length)
				{
					res.redirect('/signin?loginError=true')
				}
			})
			break				
	}
});

router.post('/signup',function(req,res){
	let person = req.body.person;
	switch(person){
		case 'patient':
			let firstNamePatient = req.body.fnamePatient
			let lastNamePatient  = req.body.lnamePatient
			let passwordPatient  = req.body.pwdPatient
			let usernamePatient  = req.body.unamePatient
			let profileStatus = 0
			let paramsPatient = [firstNamePatient,lastNamePatient,passwordPatient,usernamePatient,profileStatus]
			let promisePatient = patientQueries.signupPatient(paramsPatient)
			promisePatient.then(function(){
				req.session.profile = usernamePatient
				//res.redirect('/signin?account=true')
				res.redirect(`/profileUpload`)
			})
			break;
		case 'doctor':
			let firstNameDoctor = req.body.fnameDoctor
			let lastNameDoctor  = req.body.lnameDoctor
			let departmentDoctor = req.body.departmentDoctor
			let passwordDoctor  = req.body.pwdDoctor
			let usernameDoctor  = req.body.unameDoctor
			let hospitalName = req.body.hospitalName
			let locationDoctor = req.body.location
			let qualification = req.body.qualification
			let timing = req.body.timing
			let phoneNo = req.body.phoneNo
			let paramsDoctor = [firstNameDoctor,lastNameDoctor,hospitalName,locationDoctor,departmentDoctor,qualification,timing,phoneNo,passwordDoctor,usernameDoctor]
			let promiseDoctor = doctorQueries.signupDoctor(paramsDoctor)
			promiseDoctor.then(function(){
				res.redirect('/signin?account=true')
			})
			break;
		case 'pharmacist':
			let firstNamePharmacist = req.body.fnamePharmacist
			let lastNamePharmacist  = req.body.lnamePharmacist
			let passwordPharmacist  = req.body.pwdPharmacist
			let usernamePharmacist  = req.body.unamePharmacist
			let pharmacy = req.body.pharmacy
			let location = req.body.location;
			let paramsPharmacist = [firstNamePharmacist,lastNamePharmacist,passwordPharmacist,usernamePharmacist,pharmacy,location]
			let promisePharmacist = pharmacistQueries.signupPharmacist(paramsPharmacist)
			promisePharmacist.then(function(){
				res.redirect('/signin?account=true')
			})
			break;
		case 'lab':
			let firstNameLab = req.body.fnameLab
			let lastNameLab  = req.body.lnameLab
			let passwordLab  = req.body.pwdLab
			let usernameLab  = req.body.unameLab
			let paramsLab = [firstNameLab,lastNameLab,passwordLab,usernameLab]
			let promiseLab = labQueries.signupLab(paramsLab)
			promiseLab.then(function(){
				res.redirect('/signin?account=true')
			})
			break;				
	}
});

router.post('/logout',function(req,res){
	global.authentication = undefined
	res.locals.session.QRcode = undefined
	req.session.destroy()
	res.redirect('/')
});

router.post('/doctorinfo',function(req,res){
	let username = req.body.docusername
	res.redirect(`/doctorinfo?username=${username}`)
})

router.post('/pharminfo',function(req,res){
	let username = req.body.pharmusername
	res.redirect(`/pharminfo?username=${username}`)
})

router.post('/prescriptionenter', function(req,res){
	let doctorusername = res.locals.session.usernameDoctor 
	var d = new Date()
	var date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` 
	
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
	req.body.medicines
	]

	let promise = doctorQueries.doctorPrescriptionEnterInsert(values)
	promise.then(function(){
		res.redirect(`/prescriptionenter?insert=${true}`)
	})
})

router.post('/patientinfoqrcode', function(req,res){
	let usernameQR = req.body.patientusername
	res.redirect(`/patientinfoqrcode?usernameQR=${usernameQR}`)
})

router.post('/destroyPatientSession' , function(req,res,next){
	global.authentication = undefined
	res.locals.session.QRcode = undefined
	res.redirect('/patientinfo')
})

router.post('/reportUpload',uploadReports.single('doc'),function(req,res){
		labQueries.reportCount(req.body.patientUsername).then(function(record){
		let usernameLab = req.session.usernameLab
		let username = req.body.patientUsername 
		var d = new Date()
		let count = record.length + 1
		let uniqname = `report${req.body.patientUsername}${count}`
		var date = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}` 
		let testName = req.body.testName
		let department = req.body.department
		let params = [username, usernameLab, uniqname, date, testName, department]
    	return labQueries.reportUpload(params).then(function(){
    		res.redirect('/reportUpload?upload=success')
    	})
	})
});

router.post('/getnotifs',function(req,res){
	let uname = res.locals.session.usernamePatient
	let promise = patientQueries.getNotifications(uname)
	promise.then(function(notifications){
		res.send({notifications:notifications})
	})
})

//Prescription QR Code Setup

router.get('/prescriptioninfo',redirectRoutes.redirectLoginPharmacist,function(req,res){
	res.render('pharmacist/prescriptioninfo')
})

router.get('/prescriptioninfoqrcode',redirectRoutes.redirectLoginPharmacist,authmiddlewarePrescription,function(req,res){
	let usernameQR = req.query.usernameQR
	req.session.usernamePatient = usernameQR
	res.render('pharmacist/prescriptioninfoqrcode',{usernameQR})
})

router.get('/prescriptions',redirectRoutes.redirectLoginPharmacist,function(req,res){
	let username = req.query.usernamePatient
	let promise = pharmacistQueries.prescriptioninfo(username)
	promise.then(function(prescriptions){
		res.render('pharmacist/prescriptions',{prescriptions})
	})
})

router.post('/prescriptioninfoqrcode',function(req,res){
	let uname = req.body.patientusername
	res.redirect(`/prescriptioninfoqrcode?usernameQR=${uname}`)
})

router.get('/profileUpload',function(req,res){
	res.render('profileUpload')
})

router.post('/profileUpload',uploadProfile.single('image'), function(req,res){
	let username = req.session.profile
	let promise = patientQueries.updateProfile(username)
	promise.then(function(){
		res.redirect('/signin?account=true')
	})
})


module.exports = router