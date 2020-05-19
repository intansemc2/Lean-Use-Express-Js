const express = require('express');
const app = express();
const appPort = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

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

//Listen
app.listen(appPort, function () {
	console.log(`Server is on and listening at Port ${appPort}`);
});