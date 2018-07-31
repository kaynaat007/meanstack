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
    res.redirect("back"); // back to the page which user came from
  }
  Campground.findById(req.params.id, function(err, foundCampGround){
    if(err) {
      res.redirect("back");
    }
    else{
      console.log(foundCampGround);
      if ( foundCampGround.author.id.equals(req.user._id)) {
        next();
      }
      else{
        res.redirect("back");
      }
    }
  });

};

middlewareObj.isLoggedIn = function(req, res, next){

  if ( req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");

}

module.exports = middlewareObj;
