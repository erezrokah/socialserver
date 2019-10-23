const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const jwt = require('jsonwebtoken')

//Configuring App wide variables
app.set('port',process.env.PORT || 5000)

//Setting Up Middlewares

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Session Middleware
app.use(session({
	secret:'secret',
	resave:false,
	saveUninitialized:false,
	cookie:{
		maxAge:1000*60*60
	}
}));

//CORS Middleware
app.use(cors({
	credentials:true,
	origin:true
}))

app.use((req,res,next)=>{
	// console.log(req.session)
	next()
})

//Connect Flash Middleware
app.use(flash())

//JWT Middleware
app.use('/apiGET',(req,res,next)=>{
	const bearerHeader = req.headers['authorization']
	if(typeof bearerHeader!=='undefined')
	{
		const bearerToken = bearerHeader.split(' ')[1]
		jwt.verify(bearerToken,'secretkey',(err,authData)=>{
			if(err){
				res.sendStatus(403)
			}
			next()
		})
	}
	else{
		res.sendStatus(403)
	}
})

//Static Middleware
app.use(express.static(path.join(__dirname,'public')))

//Error Handler Middleware
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.send({
			message: err.message,	
			error: err
		});
	});
}

//GET API endpoints
app.use('/apiGET',require('./APIs/GET/patientRequests'))
app.use('/apiGET',require('./APIs/GET/doctorRequests'))
app.use('/apiGET',require('./APIs/GET/pharmacistRequests'))
app.use('/apiGET',require('./APIs/GET/labRequests'))
app.use('/apiGET',require('./APIs/GET/generalRequests'))
app.use('/apiAuth',require('./APIs/GET/authCheckRequests'))

//POST API endpoints
app.use('/apiPOST',require('./APIs/POST/generalRequests'))
app.use('/apiPOST',require('./APIs/POST/patientRequests'))
app.use('/apiPOST',require('./APIs/POST/doctorRequests'))

//Serve React app in production
if(process.env.NODE_ENV==='production'){
	app.use(express.static('client/build'))

	app.get('*',(req,res)=>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'))
	})
}

app.listen(app.get('port'), () => {
	console.log('servers running on 5000')
})

