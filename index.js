const express = require('express');
const app = express();
var path = require("path");

const appPort = 3000;

const userRoute = require('./routes/users.routes')

//Configs
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

//Rounting 
app.get('/', function (request, response, next) {
	response.render('index',{
		name: 'User'
	});
	next();
});

app.use("/users/", userRoute);

//Listen
app.listen(appPort, function () {
	console.log(`Server is on and listening at Port ${appPort}`);
});
