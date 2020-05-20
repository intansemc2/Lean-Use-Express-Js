const express = require('express');
const app = express();
const appPort = 3000;

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

//Configs
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Data
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

var users = db.get("users").value();

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
		matchedUsers = db.get("users").value().filter(function (user) {
			return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
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
	db.get("users").push({name: request.body.name}).write();
	response.render('./users/index.pug',{
		users: db.get("users").value()
	});
});

//Listen
app.listen(appPort, function () {
	console.log(`Server is on and listening at Port ${appPort}`);
});