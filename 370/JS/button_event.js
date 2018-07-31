
document.querySelector("button").addEventListener('click', function() {

   var body = document.querySelector("body");
   if ( body.style.background != "purple") {
     body.style.background = "purple";
   }
   else {
     body.style.background = "white";
   }
});
