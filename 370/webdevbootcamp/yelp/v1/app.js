var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
  { "name": "Salmon creek", image: "http://www.photosforclass.com/download/pixabay-3406137?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104497f8c178a4e8b0bd_960.jpg&user=lukasbieri"},
  { "name": "Granite Hill", image: "http://www.photosforclass.com/download/pixabay-2064522?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Feb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104497f8c178a4e8b0bd_960.jpg&user=12019"},
  { "name": "Mountain Goats Rest", image: "http://www.photosforclass.com/download/pixabay-548022?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fec31b90f2af61c22d2524518b7444795ea76e5d004b014439df0c07aa2e8b0_960.jpg&user=bhossfeld"}
]

app.get("/",  function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){


  res.render("campgrounds", {campgrounds: campgrounds});


});

app.post('/campgrounds', function(req, res){
      var name = req.body.name;
      var image = req.body.image;
      campgrounds.push({"name": name, "image": image});
      res.redirect("/campgrounds");
});

app.get('/campgrounds/new', function(req, res){
   res.render("new.ejs");
});

app.listen(8000, 'localhost', function(){
  console.log("started yelp server");
});
