var express               = require("express"),
    mongoose              = require('mongoose'),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user"),
    app                   = express();

mongoose.connect("mongodb://localhost/auth_demo_app");
app.set("view engine", "ejs");
app.use(require("express-session")({
  secret: "Rusty is the best and cutest dog",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // enconding, putting in back in session.
passport.deserializeUser(User.deserializeUser()); // reading session, decoding data from session.

// ------------ROUTES

app.get("/", function(req, res){
  res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
  res.render("secret");
});

app.get("/register", function(req, res){
   res.render("register");
});

app.post("/register", function(req, res){

  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
     if (err) {
       console.log(err)
       return res.render("register");
     }
     else{
       passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
       }) ;
     }
  });

});


app.get("/login", function(req, res){
   res.render("login");
});

// middleware. some code that runs before
app.post("/login",
     passport.authenticate("local",
    {
       successRedirect: "/secret",
       failureRedirect:  "/login"
    }),
    function(req, res){

    });

app.get("/logout", function(req, res){
   req.logout();  // passport is destroying thiis user session.
   res.redirect("/");
});

function isLoggedIn(req, res, next){
  if ( req.isAuthenticated() ){
    return next();
  }
  res.redirect("/login");
}

app.listen(8000, 'localhost', function(){
  console.log("started");
});
