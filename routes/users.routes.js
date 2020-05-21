var express = require('express');
var router = express.Router();
const shortid = require('shortid');

const db = require('../db');

//Data
var users = db.get("users").value();


//Routing
router.get('/', function (request, response) {
	response.render('users/index',{
		users: users,
		usersLength: users.length,
		q: ''
	});
});

router.get('/search', function (request, response) {
	var q = request.query.q;
	var matchedUsers = [];

	if (q) {
		matchedUsers = db.get("users").value().filter(function (user) {
			return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		});
	}

	response.render('users/index',{
		users: matchedUsers,
		usersLength: matchedUsers.length,
		q: q
	});
});

router.get('/create', function (request, response) {
	response.render('users/create');
});

router.get('/views/:id', function (request, response) {
	var id = request.params.id;
	var user = db.get("users").find({id: id}).value();
	console.log(user);

	response.render('users/views', {
		user: user
	});
});

router.post('/create', function (request, response) {
	db.get("users").push({
		id: shortid.generate(),
		name: request.body.name
	}).write();
	response.render('users/index',{
		users: db.get("users").value()
	});
});

module.exports = router;