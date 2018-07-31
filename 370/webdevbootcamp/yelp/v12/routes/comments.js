var express = require("express"),
     Campground = require("../models/campground"),
     Comment    = require("../models/comment"),
     router     = express.Router({mergeParams: true});  // mergeParams for successfully loading :id part

// commments new
router.get("/new", isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, foundCampGround){
        if ( err) {
          req.flash("error", "Cannot render this form");
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
        req.flash("error", "could not create comment object");
        console.log(err);
        res.redirect("/campgrounds");
      }
      else{
        Comment.create(req.body.comment, function(err, comment){
            // add usernmae and id to comment and save commentsx
            comment.author.username = req.user.username;
            comment.author.id = req.user._id;
            comment.save();
            // add that comment to campground.
            foundCampGround.comments.push(comment);
            foundCampGround.save();
            // redirect.
            res.redirect("/campgrounds/" + foundCampGround._id);
        });

      }
    });
});


router.get("/:comment_id/edit", checkCommentOwnership,  function(req, res){
  campground_id = req.params.id;
  Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
         res.render("/campgrounds");
       }
       else{
         res.render("comments/edit", {comment: foundComment, campground_id: campground_id});
       }
  });
});

router.put("/:comment_id", checkCommentOwnership,  function(req, res){

  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,  function(err, updatedComment){
    if(err){
      res.redirect("back");
    }
    else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });

});

router.delete("/:comment_id", checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err) {
         res.redirect("back");
       }
       else{
         req.flash("success", "comment deleted"); 
         res.redirect("/campgrounds/" + req.params.id);
       }
  });
})

// middleware
function isLoggedIn(req, res, next){
  if ( req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
}

function checkCommentOwnership(req, res, next){

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

}

module.exports = router;
