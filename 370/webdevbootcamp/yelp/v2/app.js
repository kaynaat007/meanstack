var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");


var campgroundSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    description: String
  }
);

var Campground = mongoose.model("Campground", campgroundSchema);  // model is ready

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

// INDEX
app.get("/campgrounds", function(req, res){

 // fetch from DB
  Campground.find({}, function(err, campgrounds){
    if ( err ){
      console.log(err);
    }
    else{
      res.render("index", { campgrounds: campgrounds});
    }
  });

});

// CREATE
app.post('/campgrounds', function(req, res){

      var name = req.body.name;
      var image = req.body.image;
      var desc = req.body.description;
      Campground.create({
        "name": name,
        "image": image,
        "description": desc
      }, function(err, newlyCreated){
            if ( err) {
              console.log(err);
            }
            else {
              res.redirect("/campgrounds");
            }
      });
});

// NEW
app.get('/campgrounds/new', function(req, res){
   res.render("new.ejs");
});

//SHOW
app.get('/campgrounds/:id', function(req, res){
  Campground.findById(req.params.id, function(err, foundCampGround){
      if( err ){
        console.log(err);
      }
      else {
           res.render("show", {campground: foundCampGround});
      }
  });
});

app.listen(8000, 'localhost', function(){
  console.log("started yelp server");
});
