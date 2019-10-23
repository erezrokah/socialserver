const express = require('express');
const router = express.Router();

const labQueries = require('../../queries/labQueries')

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
		var readStatus = 0
		let params = [username, usernameLab, uniqname, date, testName, department, readStatus]
    	return labQueries.reportUpload(params).then(function(){
    		res.redirect('/reportUpload?upload=success')
    	})
	})
});

module.exports = router