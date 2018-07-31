var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//
// router.get("/",  function(req, res){
//     res.render("landing");
// });

// INDEX
router.get("/", function(req, res){

 // fetch from DB
  Campground.find({}, function(err, campgrounds){
    if ( err ){
      console.log(err);
    }
    else{
      console.log(campgrounds);
      res.render("campground/index", {campgrounds: campgrounds });
    }
  });

});

// CREATE
router.post('/', isLoggedIn, function(req, res){

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
router.get('/new', isLoggedIn, function(req, res){
   res.render("campground/new.ejs");
});

//SHOW
router.get('/:id', function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampGround){
      if( err ){
        console.log(err);
      }
      else {

           res.render("campground/show", {campground: foundCampGround});
      }
  });
});

// middleware
function isLoggedIn(req, res, next){
  if ( req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
}


module.exports  = router;
