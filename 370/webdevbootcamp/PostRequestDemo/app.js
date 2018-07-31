var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["Suresh", "Mukesh", "Dinesh", "Durgesh", "Ramesh"];

app.get("/", function(req, res){
  res.render("home");
});

app.get("/friends", function(req, res){
   res.render("friends", { friends: friends});
 });


app.post("/addfriend", function(req, res){
   var name  = req.body.friend;
   console.log(req.body);
   friends.push(name);
   res.redirect("/friends"); 

});

app.listen(8000, 'localhost', function(){
  console.log("started server");
});
