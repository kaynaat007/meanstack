var express    =    require("express"),
    router     = express.Router(),
    passport   = require("passport"),
    User       = require("../models/user");

// AUTH ROUTES
router.get("/register", function(err, res){
  res.render("register");
});

router.post("/register", function(req, res){
    User.register(
        new User({ username: req.body.username}),
        req.body.password,
        function(err, newUser){
            if ( err ){
              req.flash("error", err.message);
              res.render("register");
            }
            else {
              passport.authenticate("local")(req, res, function(){
                  res.redirect("/campgrounds");
              });
            }
          }
      );
});

router.get("/login", function(req, res){
   res.render("login");
});

router.post(
"/login",
 passport.authenticate("local", {
   successRedirect: "/campgrounds", // success bitch
   failureRedirect: "/login"
 }),
function(req, res){

});

router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You have been logged out");
   res.redirect("/campgrounds");
});

module.exports = router;
