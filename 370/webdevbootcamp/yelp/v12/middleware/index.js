// all middlwar
var Campground = require("../models/campground"),
    Comment    = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
    //
      console.log( "is authenticate" + req.isAuthenticated()) ;
      if( !req.isAuthenticated()){
        return res.redirect("back"); // back to the page which user came from
      }
      console.log("authenticated");
      Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
          return res.redirect("back"); // move back.
        }
        else{
          console.log(req.user);
          if (foundComment.author.id.equals(req.user._id)) {
            next(); // go ahead.
          }
          else{
             return res.redirect("back"); // move back.
          }
        }
      });
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
  //
  if( !req.isAuthenticated()){
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back"); // back to the page which user came from
  }
  Campground.findById(req.params.id, function(err, foundCampGround){
    if(err) {
      req.flash("error", "Campground not found!");
      res.redirect("back");
    }
    else{
      console.log(foundCampGround);
      if ( foundCampGround.author.id.equals(req.user._id)) {
        next();
      }
      else{
        req.flash("error", "You dont have permission to do that");
        res.redirect("back");
      }
    }
  });
};

middlewareObj.isLoggedIn = function(req, res, next){

  if ( req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You must be logged in !");
  return res.redirect("/login");

}

module.exports = middlewareObj;
