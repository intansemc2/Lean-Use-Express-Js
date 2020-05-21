const shortid = require('shortid');

const db = require('../db');

//Controllers
module.exports.index = function (request, response) {
	const users = db.get("users").value();

	response.render('users/index',{
		users: users,
		usersLength: users.length,
		q: ''
	});
};

module.exports.search = function (request, response) {
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
};

module.exports.create = function (request, response) {
	response.render('users/create');
};

module.exports.viewById = function (request, response) {
	var id = request.params.id;
	var user = db.get("users").find({id: id}).value();

	response.render('users/views', {
		user: user
	});
};

module.exports.responsePostCreate = function (request, response) {
	db.get("users").push({
		id: shortid.generate(),
		name: request.body.name
	}).write();

	const users = db.get("users").value();

	response.render('users/index',{
		users: users,
		q: '',
		usersLength: users.length
	});
};