const db = require('../config/dbconfig')

var reportCount = function(username){
	return new Promise(function(resolve,reject){
		let sql = "SELECT * FROM reports WHERE unameprep = ?"
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

var labSpecificInfo = function(username){
	return new Promise(function(resolve,reject){
		let sql = "SELECT * FROM labinfo WHERE unamelab=?"
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


var labinfo = function(){
	return new Promise(function(resolve,reject){
		let sql = "SELECT * FROM labinfo"
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

var signupLab = function(params){
	return new Promise(function(resolve,reject){
		let sql = "INSERT INTO labinfo(fnamelab,lnamelab,unamelab,pwd,profileStatus)VALUES(?,?,?,?,?)"
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

var reportUpload = function(params){
	return new Promise(function(resolve,reject){
		let sql = `INSERT INTO reports(unameprep,unamedrep,reportid,dateofreport,
		testname,department,readStatus)VALUES(?,?,?,?,?,?,?)`
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
	reportCount,
	labinfo,
	signupLab,
	reportUpload,
	labSpecificInfo
}