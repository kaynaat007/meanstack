var express = require ('express');
var app = express(); // store in app.

app.get('/', function(req, res){
    res.send("Hi there");
});

app.get('/bye', function(req, res){
   res.send("BYE");
});

app.get('*', function(req, res){
  res.send('You are a start'); 
});

app.listen(8000, 'localhost', function(){
  console.log('server has started');
});
