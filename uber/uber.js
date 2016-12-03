var Uber = require('node-uber');
var express = require('express');
var app = express();
var url = require('url');
var request = require('request');

// worked, but needed to go to localhost:1455 first to click "allow"
// also only worked when i use regular log in, not Facebook log in
// may have to delete cookies
// then switch to book

var options = {
  sandbox: true,
  client_id: '-z2J0ZM18b95NoFh2HvWzgLfk0DmE4WR',
  client_secret: 'tiLYqSQP0a6i8Y06BvByCSFwqPY30uXY-qGzStLG',
  server_token: '7NMYlUMAgunVmPEndyKEJy2OLlCbN1M9ZUB8aCpF',
  redirect_uri: 'http://localhost:1455/api/callback'
}

var uber = new Uber(options);

app.get('/', function (req, res) {
  // Kick off the authentication process
  var scope = ['request'];
  res.redirect(uber.getAuthorizeUrl(scope, 'http://localhost:8000/api/callback'));
});

app.get('/api/callback', function (req, res) {
  uber.authorization ({grantType: 'authorization_code', authorization_code: req.query.code}, function (err, access_token) {
    // Now we've got an access token we can use to book rides.
    // Access tokens expires in 30 days at whichpoint you can refresh.
    // You should save this token
    // More info: https://developer.uber.com/docs/authentication
    uber.access_token = access_token;
    res.send('Got an access token! Head to /book to initiate an ride request.');
  });
});

app.get('/api/book', function (req, res) {
  var rideDetails = {
    start_latitude: 123, //need to work on connecting the google geocoder coordinates to this.
    start_longitude: 123,
    product_id: "a1111c8c-c720-46c3-8534-2fcdd730040d"
  };
  
  uber.requests.requestRide(rideDetails, function (err, result) {
    if (err) {
      // Failed
      console.log(err);
    } else{
      res.send("An Uber is on the way!"); //figure out how to implement this into the griddle component
    }
  })
})

app.get('/api/login', function(request, response) {
  var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
  response.redirect(url);
});

app.get('/api/products', function(request, response) {
  // extract the query from the request URL
  var query = url.parse(request.url, true).query;

  // if no query params sent, respond with Bad Request
  if (!query || !query.lat || !query.lng) {
    response.sendStatus(400);
  } else {
    uber.products.getAllForLocation(query.lat, query.lng, function(err, res) {
      if (err) {
        console.error(err);
        response.sendStatus(500);
      } else {
        response.json(res);
      }
    });
  }
});

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});
