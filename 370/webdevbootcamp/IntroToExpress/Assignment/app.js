express = require('express');
var app = express()

app.get('/', function(req, res){
   res.send("Hi there. Welcome to my assignment!");
});

app.get('/speak/:animal', function(req, res){
      var anm = req.params.animal;
      var voice = "";
      if (anm === "pig"){
         voice = "Oink";
      }
      else if (anm == "cow"){
        voice = "Moo";
      }
      else {
        voice = "Woof Woof";
      }
      res.send("The " + anm + " says  " +  voice);
});

app.get('/repeat/:str/:times', function(req, res){
  var str = req.params.str;
  console.log(req);
  console.log(req.params.times);
  var times = Number(req.params.times);
  var result = "";
  for ( var i = 0; i < times; i++) {
      result += (str + " ");
  }
  return res.send(result);
});

app.get('*', function(req, res){
   res.send("Sorry page not found. Waht are you doing with your life ?");
});

app.listen(8000, 'localhost', function(){
  console.log("started server");
});
