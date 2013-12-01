var db = require('mongodb').Db,

var mongoUri = process.env.MONGOLAB_URI;
db.connect(mongoUri, function (err, db) {
  console.log('connected to database')
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
