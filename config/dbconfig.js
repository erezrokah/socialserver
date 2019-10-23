var mysql = require('mysql');

/*var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'usmanrusso',
  password : 'usmanrusso',
  database : 'db'
});*/

var db = mysql.createConnection({
  host     : 'remotemysql.com',
  user     : '8oAOtD8KDy',
  password : 'aWoEs2gKpx',
  database : '8oAOtD8KDy'
});

 
db.connect(function(err){
	if(err) throw err
	else
	{
		console.log("Connected to database successfully")
	}	
})

module.exports = db