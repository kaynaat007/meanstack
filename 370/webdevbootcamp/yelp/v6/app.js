var  express       = require('express'),
     bodyParser    = require('body-parser'),
     mongoose      = require('mongoose'),
     Campground    = require('./models/campground');
     Comment       = require('./models/comment'),
     seedDB        = require('./seed'),
     passport      = require('passport'),
     LocalStrategy = require("passport-local"),
     User          = require("./models/user"),
     app           = express(),

mongoose.connect("mongodb://localhost/yelp_camp");

 // model is ready
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIG
app.use(require("express-session")({
     secret: "I am batman",
     resave: false,
     saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;  // available in templates !
   next();
});


seedDB();

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
      console.log(campgrounds);
      res.render("campground/index", {campgrounds: campgrounds });
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
   res.render("campground/new.ejs");
});

//SHOW
app.get('/campgrounds/:id', function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampGround){
      if( err ){
        console.log(err);
      }
      else {

           res.render("campground/show", {campground: foundCampGround});
      }
  });
});

// commments
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, foundCampGround){
        if ( err) {
          console.log(err);
        }
        else {
           res.render("comments/new", {campground: foundCampGround});
        }
   });
});

app.post("/campgrounds/:id/comments", isLoggedIn,  function(req, res){
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

// AUTH ROUTES
app.get("/register", function(err, res){
  res.render("register");
});

app.post("/register", function(req, res){
    User.register(
        new User({ username: req.body.username}),
        req.body.password,
        function(err, newUser){
            if ( err ){
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

app.get("/login", function(req, res){
   res.render("login");
});

app.post(
"/login",
 passport.authenticate("local", {
   successRedirect: "/campgrounds", // success bitch
   failureRedirect: "/login"
 }),
function(req, res){

});

app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next){
  if ( req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
}

app.listen(8000, 'localhost', function(){
  console.log("started yelp server");
});
