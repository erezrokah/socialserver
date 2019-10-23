const db = require('../config/dbconfig')

var doctorPrescriptionEnterInsert = function(params){
	return new Promise(function(resolve,reject){
			let sql = `INSERT INTO prescriptionnew(unamep,unamed,dateofprescription,diagnosis,investigation,referral,comments,
			bloodpressuresystolic,bloodpressuredystolic,bloodsugar,bloodsugarfast,presentingcomplaints,patientencounter,advice,followup,medicines,readStatus)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
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

var docSpecificInfo = function(username){
	return new Promise(function(resolve,reject){
		let sql = "SELECT * FROM docinfo WHERE unamedoc=?"
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

var docinfo = function(){
	return new Promise(function(resolve,reject){
		let sql = "SELECT * FROM docinfo"
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

var signupDoctor = function(params){
	return new Promise(function(resolve,reject){
		let sql = "INSERT INTO docinfo(fnamedoc,lnamedoc,pwd,unamedoc,profileStatus)VALUES(?,?,?,?,?)"
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

var completeProfileDoctor = function(params){
	return new Promise(function(resolve,reject){
		let sql = `UPDATE docinfo SET 
		fnamedoc=?,
		lnamedoc=?,
		pwd=?,
		unamedoc=?,
		qualification=?,
		department=?,
		phone_number=?,
		timing=?,
		hospitalName=?,
		location=?
		WHERE unamedoc=?`
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

const fetchSchedule = (unamedoc) => {
	return new Promise((resolve,reject)=>{
		/*let sql = `
		SELECT
		appointment.unamepat,
		appointment.date,
		appointment.time,
		patinfo.fnamepat,
		patinfo.lnamepat
		INNER JOIN appointment ON
		appointment.unamepat = patinfo.unamepat 
		FROM appointment WHERE appointment.unamedoc=?`*/
		let sql = 'SELECT * FROM appointment WHERE unamedoc=?'
		db.query(sql,[unamedoc],(err,rows)=>{
			if(err){
				reject(err)
			}
			else{
				resolve(rows)
			}
		})
	})
}

module.exports = {
	doctorPrescriptionEnterInsert,
	docinfo,
	signupDoctor,
	docSpecificInfo,
	fetchSchedule,
	completeProfileDoctor
}