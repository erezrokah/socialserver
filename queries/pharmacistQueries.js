const db = require('../config/dbconfig')

var prescriptioninfo = function(username){
	return new Promise(function(resolve,reject){
		let sql = `SELECT docinfo.fnamedoc,
			docinfo.lnamedoc,
			docinfo.department, 
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

var enterNotification = function(params){
	//Will enter on press of the button. The pharmacist who will send the notification will
	//depend upon the location of the pharmacist and the doctor.
	return new Promise(function(resolve,reject){
		let sql = `INSERT INTO notifs(unamepatient,notification,presid,readStatus)VALUES(?,?,?,?)`
		db.query(sql,params,function(err){
			if(err){
				reject(err)	
			}
			else{
				resolve()
			}
		})
	})
}

var pharmSpecificInfo = function(username){
	return new Promise(function(resolve,reject){
		let sql = "SELECT * FROM pharminfo WHERE unamepharm=?"
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


var pharminfo = function(){
	return new Promise(function(resolve,reject){
		let sql = "SELECT * FROM pharminfo"
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

var signupPharmacist = function(params){
	return new Promise(function(resolve,reject){
		let sql = "INSERT INTO pharminfo(fnamepharm,lnamepharm,unamepharm,pwd,profileStatus)VALUES(?,?,?,?,?)"
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

var completeProfilePharmacist = function(params){
	return new Promise(function(resolve,reject){
		let sql = `
		UPDATE pharminfo SET 
		fnamepharm=?,
		lnamepharm=?,
		unamepharm=?,
		pwd=?,
		location=?,
		pharmacy=?
		WHERE
		unamepharm=?`
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

module.exports = {
	prescriptioninfo,
	enterNotification,
	pharminfo,
	pharmSpecificInfo,
	signupPharmacist,
	completeProfilePharmacist
}