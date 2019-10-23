const db = require('../config/dbconfig')

var dashboardPrescriptions = function(username){
	return new Promise(function(resolve,reject){
		let sql = `
		SELECT 
		docinfo.fnamedoc,
		docinfo.lnamedoc,
		docinfo.department, 
		prescriptionnew.dateofprescription,
		prescriptionnew.investigation,
		prescriptionnew.id,
		prescriptionnew.bloodpressuresystolic,
		prescriptionnew.medicines,
		prescriptionnew.investigation,
		prescriptionnew.diagnosis,
		prescriptionnew.comments,
		prescriptionnew.referral,
		prescriptionnew.bloodsugar,
		prescriptionnew.presentingcomplaints,
		prescriptionnew.physiciannotes,
		prescriptionnew.patientencounter,
		prescriptionnew.advice,
		prescriptionnew.followup, 
		prescriptionnew.dateofprescription,
		substring(prescriptionnew.investigation,1,15) as prescriptionpart,
		prescriptionnew.id
		FROM docinfo 
		INNER JOIN prescriptionnew
		ON docinfo.unamedoc=prescriptionnew.unamed 
		WHERE prescriptionnew.unamep=?
		ORDER BY prescriptionnew.dateofprescription DESC`
		db.query(sql,[username],function(err,rows){
			if(err){
				reject(err)	
			}
			else{
				resolve(rows)
			}
		})
	})
}

var dashboardReports = function(username){
	return new Promise(function(resolve,reject){
		let sql= `SELECT * FROM reports WHERE unameprep=?`
		db.query(sql, [username],function(err,rows){
			if(err){
				reject(err)	
			}
			else{
				resolve(rows)
			}
		})
	})
	
}

var dashboardCharts = function(username){
	return new Promise(function(resolve,reject){
		let sql =  `SELECT bloodpressuresystolic,bloodpressuredystolic,dateofprescription,
				bloodsugarfast,bloodsugar from prescriptionnew WHERE unamep=? ORDER BY 
				dateofprescription DESC`
		db.query(sql, [username], function(err,rows){
			if(err){
				reject(err)	
			}
			else{
				resolve(rows)
			}
		})
	})
}

var profile = function(username){
	return new Promise(function(resolve,reject){
		let sql = `SELECT * FROM patinfo where unamepat=?`
		db.query(sql,[username], function(err,rows){
			if(err){
				reject(err)	
			}
			else{
				resolve(rows)
			}
		})
	})
}

var doctorinforesults = function(username){
	return new Promise(function(resolve,reject){
		let sql= `SELECT * FROM docinfo WHERE unamedoc=?`
		db.query(sql,[username], function(err,rows){
			if(err){
				reject(err)	
			}
			else{
				resolve(rows)
			}
		})
	})
}

var pharminforesults = function(username){
	return new Promise(function(resolve,reject){
		let sql= `SELECT * FROM pharminfo WHERE unamepharm=?`
		db.query(sql,[username], function(err,rows){
			if(err){
				reject(err)	
			}
			else{
				resolve(rows)
			}
		})
	})
}

var prescriptionDetailed = function(id){
	return new Promise(function(resolve,reject){
		let sql= `
		SELECT 
		docinfo.fnamedoc,
		docinfo.lnamedoc,
		docinfo.department, 
		prescriptionnew.dateofprescription,
		prescriptionnew.investigation,
		prescriptionnew.id,
		prescriptionnew.bloodpressuresystolic,
		prescriptionnew.medicines,
		patinfo.fnamepat,
		patinfo.lnamepat,
		patinfo.unamepat,
		prescriptionnew.investigation,
		prescriptionnew.diagnosis,
		prescriptionnew.comments,
		prescriptionnew.referral,
		prescriptionnew.presentingcomplaints,
		prescriptionnew.physiciannotes,
		prescriptionnew.patientencounter,
		prescriptionnew.advice,
		prescriptionnew.followup
		FROM prescriptionnew
		INNER JOIN docinfo
		ON docinfo.unamedoc=prescriptionnew.unamed 
		INNER JOIN patinfo
		ON patinfo.unamepat=prescriptionnew.unamep 
		WHERE prescriptionnew.id=?`
		db.query(sql,[id], function(err,rows){
			if(err){
				reject(err)	
			}
			else{
				resolve(rows)
			}
		})
	})
}

var patinfo = function(){
	return new Promise(function(resolve,reject){
		let sql = "SELECT * FROM patinfo"
		db.query(sql,function(err,rows){
			if(err){
				reject(err)	
			}
			else{
				resolve(rows)
			}
		})
	})
}

var patSpecificInfo = function(username){
	return new Promise(function(resolve,reject){
		let sql = "SELECT * FROM patinfo WHERE unamepat=?"
		db.query(sql,[username],function(err,rows){
			if(err){
				reject(err)	
			}
			else{
				resolve(rows)
			}
		})
	})
}

var signupPatient = function(params){
	return new Promise(function(resolve,reject){
		let sql = "INSERT INTO patinfo(fnamepat,lnamepat,unamepat,pwd,profileStatus)VALUES(?,?,?,?,?)"
		db.query(sql, params, function(err){
			if(err){
				reject(err)	
			}
			else{
				resolve()
			}
		})
	})	
}

var completeProfilePatient = function(params){
	return new Promise(function(resolve,reject){
		let sql = 
		`UPDATE patinfo 
		SET 
		fnamepat=?,
		lnamepat=?,
		unamepat=?,
		pwd=? 
		WHERE 
		unamepat=?`
		db.query(sql, params, function(err){
			if(err){
				reject(err)	
			}
			else{
				resolve()
			}
		})
	})	
}

var getNotifications = function(param){
	return new Promise(function(resolve,reject){
		let sql = "SELECT * FROM notifs WHERE unamepatient=? ORDER BY id DESC LIMIT 5"
		db.query(sql,[param],function(err,rows){
			if(err){
				reject(err)	
			}
			else{
				resolve(rows)
			}
		})
	})
}

var unseenPrescripitons = function(username){
	return new Promise(function(resolve,reject){
		let sql = 'SELECT * FROM prescriptionnew WHERE unamep = ? AND readStatus = 0'
		db.query(sql, [username], function(err,rows){
			if(err){
				reject(err)
			}
			else{
				resolve(rows.length)
			}
		})
	})
}

var unseenReports = function(username){
	return new Promise(function(resolve,reject){
		let sql = 'SELECT * FROM reports WHERE unameprep = ? AND readStatus = 0'
		db.query(sql,[username], function(err,rows){
			if(err){
				reject(err)
			}
			else{
				resolve(rows.length)
			}
		})
	})
}

var updatePrescriptionNumber = function(username){
	return new Promise(function(resolve,reject){
		let sql = 'UPDATE prescriptionnew SET readStatus = 1 WHERE unamep = ?'
		db.query(sql,[username],function(err){
			if(err){
				reject(err)
			}
			else{
				resolve()
			}
		})
	})
}

var updateReportNumber = function(username){
	return new Promise(function(resolve,reject){
		let sql = 'UPDATE reports SET readStatus = 1 WHERE unameprep = ?'
		db.query(sql,[username],function(err){
			if(err){
				reject(err)
			}
			else{
				resolve()
			}
		})
	})
}

var fetchTimeSlots = (unamedoc,date) => {
	return new Promise((resolve,reject)=>{
		let sql = 'SELECT time from appointment WHERE unamedoc=? AND date=?'
		db.query(sql,[unamedoc,date],(err,rows)=>{
			if(err){
				reject(err)
			}
			else{
				resolve(rows)
			}
		})
	})
}

var enterTimeSlot = (unamedoc,date,time,uname) => {
	return new Promise((resolve,reject)=>{
		let sql = 'INSERT INTO appointment(unamedoc,date,time,unamepat)VALUES(?,?,?,?)'
		db.query(sql,[unamedoc,date,time,uname],(err)=>{
			if(err){
				reject(err)
			}
			resolve()
		})
	})
}

module.exports = {
	dashboardPrescriptions,
	dashboardCharts,
	dashboardReports,
	profile,
	doctorinforesults,
	pharminforesults,
	prescriptionDetailed,
	signupPatient,
	patinfo,
	getNotifications,
	patSpecificInfo,
	unseenPrescripitons,
	updatePrescriptionNumber,
	unseenReports,
	updateReportNumber,
	fetchTimeSlots,
	enterTimeSlot,
	completeProfilePatient		
}