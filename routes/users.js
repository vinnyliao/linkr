var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('ds053698.mongolab.com', 53698, {auto_reconnect: true});
db = new Db('linkr', server);

db.open(function(err, db) {
  db.authenticate('linkr', 'linkr', function(err, result) {
    console.log("Connected to 'linkr' database");
  });
});

exports.addUser = function(req, res) {
  var user = req.body;
  console.log('Adding user: ' + JSON.stringify(user));
  db.collection('users', function(err, collection) {
    collection.insert(user, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
}

exports.getUser = function(req, res) {
  var id = req.params.id;
  console.log('Getting user: ' + id);
  db.collection('users', function(err, collection) {
    collection.findOne({'linkedin_id':id}, function(err, item) {
      res.send(item);
    });
  });
};

exports.getUsers = function(req, res) {
  console.log('Getting all users');
  db.collection('users', function(err, collection) {
    collection.find().toArray(function(err, docs) {
      res.send(docs);
    });
  });
};
