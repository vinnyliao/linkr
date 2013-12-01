var express = require('express');
var users = require('./routes/users');

var app = express();

app.get('/', function(req, res){
  var body = 'Linkr';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.post('/users', users.addUser);
app.get('/users/:id', users.getUser);
app.get('/users', users.getUsers);

var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ' + port);
