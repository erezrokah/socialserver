const db = require('../config/dbconfig')
const bcrypt = require('bcryptjs')

const patientQueries = require('./patientQueries')
const doctorQueries = require('./doctorQueries')
const pharmacistQueries = require('./pharmacistQueries')
const labQueries = require('./labQueries')

var updateProfile = function(username,person){
	return new Promise(function(resolve,reject){
		switch(person){
			case 'patient':
				let sqlPatient = "UPDATE patinfo SET profileStatus = 1 WHERE unamepat=?"
				db.query(sqlPatient,[username],function(err){
					if(err){
						reject(err)	
					}
					else{
						resolve()
					}	
				})
			break
			case 'doctor':
				let sqlDoctor = "UPDATE docinfo SET profileStatus = 1 WHERE unamedoc=?"
				db.query(sqlDoctor,[username],function(err){
					if(err){
						reject(err)	
					}
					else{
						resolve()
					}	
				})
			break
			case 'pharmacist':
				let sqlPharmacist = "UPDATE pharminfo SET profileStatus = 1 WHERE unamepharm=?"
				db.query(sqlPharmacist,[username],function(err){
					if(err){
						reject(err)	
					}
					else{
						resolve()
					}	
				})
			break
			case 'lab':
				let sqlLab = "UPDATE labinfo SET profileStatus = 1 WHERE unamelab=?"
				db.query(sqlLab,[username],function(err){
					if(err){
						reject(err)	
					}
					else{
						resolve()
					}	
				})
			break
		}
	})
}

var usernameCheck = (username,person) => {
	return new Promise(function(resolve,reject){
		switch(person){
		case 'patient':
			let sql = "SELECT * FROM patinfo WHERE unamepat=?"
			db.query(sql,[username],function(err,rows){
			if(err){
				reject(err)	
			}
			else{
				resolve(rows)
			}
		})
		break
		case 'doctor':
			let sql1 = "SELECT * FROM docinfo WHERE unamedoc=?"
			db.query(sql1,[username],function(err,rows){
				if(err){
					reject(err)	
				}
				else{
					resolve(rows)
				}
			})
		break
		case 'pharmacist':
			let sql2 = "SELECT * FROM pharminfo WHERE unamepharm=?"
			db.query(sql2,[username],function(err,rows){
				if(err){
					reject(err)	
				}
				else{
					resolve(rows)
				}
			})
		break
		case 'lab':
			let sql3 = "SELECT * FROM labinfo WHERE unamelab=?"
			db.query(sql3,[username],function(err,rows){
				if(err){
					reject(err)	
				}
				else{
					resolve(rows)
				}
			})
		break
	}
	})
}
module.exports = {updateProfile,usernameCheck}