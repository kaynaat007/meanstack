var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// load middlewares.
isLoggedIn = middleware.isLoggedIn;
checkCommentOwnership = middleware.checkCommentOwnership;
checkCampgroundOwnership = middleware.checkCampgroundOwnership;
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
      var author = {
        id: req.user._id,
        username: req.user.username
      }
      Campground.create({
        "name": name,
        "image": image,
        "author": author,
        "description": desc
      }, function(err, newlyCreated){
            if ( err) {
              console.log(err);
            }
            else{
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
        req.flash("error", "Campground not found of this id " + req.params.id);
        console.log(err);
      }
      else {

           res.render("campground/show", {campground: foundCampGround});
      }
  });
});

// EDIT
router.get("/:id/edit", checkCampgroundOwnership,  function(req, res){
   // if user is logged in and owns the campground, show the form else redirect.
    Campground.findById(req.params.id,  function(err, foundCampGround){
        res.render("campground/edit", { campground: foundCampGround });
      });
});

// UPDATE
router.put("/:id", checkCampgroundOwnership,  function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
     if(err) {
       req.flash("error", "Could not find and update this campground.");
       res.redirect("/campgrounds");
     }
     else {
       res.redirect("/campgrounds/" +  req.params.id );
     }
  });
});

// DELETE 
router.delete("/:id", checkCampgroundOwnership,  function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err) {
         req.flash("error", "could not delete this campground");
         res.redirect("/campgrounds");
       }
       else {
         res.redirect("/campgrounds");
       }
   });
});


module.exports  = router;
