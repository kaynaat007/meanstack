var express = require("express"),
     Campground = require("../models/campground"),
     Comment    = require("../models/comment"),
     router     = express.Router({mergeParams: true});  // mergeParams for successfully loading :id part

// commments new
router.get("/new", isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, foundCampGround){
        if ( err) {
          console.log(err);
        }
        else {
           res.render("comments/new", {campground: foundCampGround});
        }
   });
});

// comments create
router.post("/", isLoggedIn,  function(req, res){
    Campground.findById(req.params.id, function(err, foundCampGround){
      if( err ){
        console.log(err);
        res.redirect("/campgrounds");
      }
      else{
        Comment.create(req.body.comment, function(err, comment){

            foundCampGround.comments.push(comment);
            foundCampGround.save();
            res.redirect("/campgrounds/" + foundCampGround._id);
        });

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


module.exports = router;
