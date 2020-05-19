const express = require('express');
const app = express();
const appPort = 3000;

//Configs
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Data
var users = [
	{ id: 0, name: "user 0" },
	{ id: 1, name: "user 1" }
];

//Rounting 
app.get('/', function (request, response) {
	response.render('./index.pug',{
		name: 'User'
	});
});

app.get('/users', function (request, response) {
	response.render('./users/index.pug',{
		users: users
	});
});

app.get('/users/search', function (request, response) {
	var q = request.query.q;
	var matchedUsers = [];

	if (q) {
		matchedUsers = users.filter(function (user) {
			return user.name.indexOf(q) !== -1;
		});
	}

	response.render('./users/index.pug',{
		users: matchedUsers,
		q: q
	});
});

app.get('/users/create', function (request, response) {
	response.render('./users/create.pug');
});

app.post('/users/create', function (request, response) {
	users.push({name: request.body.name});
	response.render('./users/index.pug',{
		users: users
	});
});

//Listen
app.listen(appPort, function () {
	console.log(`Server is on and listening at Port ${appPort}`);
});