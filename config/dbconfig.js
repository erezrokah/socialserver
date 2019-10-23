var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'usmanrusso',
  password : 'usmanrusso',
  database : 'db'
});
 
db.connect(function(err){
	if(err) throw err
	else
	{
		console.log("Connected to database successfully")
	}	
})

module.exports = db