const express = require('express');
const app = express();
const appPort = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
 
app.get('/', function (request, response) {
	response.render('./index.pug',{
		name: 'User'
	});
});

app.get('/users', function (request, response) {
	response.render('./users/index.pug',{
		users: [
			{ id: 0, name: "user 0" },
			{ id: 1, name: "user 1" }
		]
	});
});
 
app.listen(appPort, function () {
	console.log(`Server is on and listening at Port ${appPort}`);
});