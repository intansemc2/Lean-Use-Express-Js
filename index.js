const express = require('express');
const appliciation = express();
const appliciationPort = 3000;
 
appliciation.get('/', function (request, response) {
	response.send('Hello World');
});
 
appliciation.listen(appliciationPort);