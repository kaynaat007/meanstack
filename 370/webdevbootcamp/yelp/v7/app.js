var  express       = require('express'),
     bodyParser    = require('body-parser'),
     mongoose      = require('mongoose'),
     Campground    = require('./models/campground');
     Comment       = require('./models/comment'),
     seedDB        = require('./seed'),
     passport      = require('passport'),
     LocalStrategy = require("passport-local"),
     User          = require("./models/user"),
     campgroundRoutes = require("./routes/campgrounds"),
     commentRoutes   = require("./routes/comments"),
     indexRoutes  = require("./routes/index"),
     app           = express();

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

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(8000, 'localhost', function(){
  console.log("started yelp server");
});
