var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('userdb', server);

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'userdb' database");
    db.collection('users', {strict:true}, function(err, collection) {
      if (err) {
        console.log("The 'users' collection doesn't exist. Creating it with sample data...");
        populateDB();
      }
    });
  }
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
    collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
      res.send(item);
    });
  });
};

var populateDB = function() {
  var users = [
    {
      linkedin_id:"A"
    },
    {
      linkedin_id:"B"
    }
  ];

  db.collection('users', function(err, collection) {
    collection.insert(users, {safe:true}, function(err, result) {});
  });
};
