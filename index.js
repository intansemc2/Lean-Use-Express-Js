const express = require('express');
const appliciation = express();
const appliciationPort = 3000;
 
appliciation.get('/', function (request, response) {
	response.send('Hello World');
});
 
appliciation.listen(appliciationPort, function () {
	console.log(`Server is on and listening at Port ${appliciationPort}`);
});