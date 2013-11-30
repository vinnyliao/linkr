var express = require('express');
var users = require('./routes/users');

var app = express();

app.get('/', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.post('/users', users.addUser);
app.get('/users', users.getUsers);
app.get('/users/:id', users.getUser);

app.listen(3000);
console.log('Listening on port 3000');