
var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var reset = document.querySelector("#reset");
var h1 = document.querySelector("h1");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var spMessage = document.querySelector("#message");


hardBtn.classList.add("selected");
var pickedColor = pickColor();

colorDisplay.textContent = pickedColor;

easyBtn.addEventListener('click', function(){
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for ( var i = 0; i < squares.length; i++) {
      if ( colors[i]) {
        squares[i].style.background = colors[i];
      }
      else{
        squares[i].style.display = "none";
      }
    }

});

hardBtn.addEventListener('click', function(){
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for ( var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
        squares[i].style.display = "block";
    }
});

reset.addEventListener('click', function(){
     colors = generateRandomColors(numSquares);
     pickedColor = pickColor();
     colorDisplay.textContent = pickedColor;
     for ( var i = 0; i < colors.length; i++){
       squares[i].style.backgroundColor = colors[i];
     }
     h1.style.backgroundColor = "steelblue";
     spMessage.textContent = "";
     this.textContent = "New Colors";
});

for ( var i = 0; i < squares.length; i++) {
  squares[i].style.backgroundColor = colors[i];
  squares[i].addEventListener('click', function(){
        var currentColor = this.style.backgroundColor;
        if ( currentColor === pickedColor) {
          document.getElementById("message").textContent = "correct";
          h1.style.backgroundColor = currentColor;
          changeColor(currentColor);
          reset.textContent = "Play Again?";
        }
        else {
          this.style.backgroundColor = "#232323";
          document.getElementById("message").textContent = "TryAgain";
        }

  });
}


function changeColor ( color ) {
  // sets all squares to color 'color';
  console.log("squares length is " + squares.length);
  for ( var i = 0; i < squares.length; i++) {
     squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor( Math.random() * colors.length );
  return colors[random];
}

function generateRandomColors(count) {
  var arr = [];
  for ( var i = 0; i < count; i++) {
     var red = Math.floor(Math.random() * 256);
     var green = Math.floor(Math.random() * 256);
     var blue = Math.floor(Math.random() * 256);
     var color = "rgb(" + red + ", " + green + ", " + blue + ")";
     console.log(color);
     arr.push(color);
  }
  return arr;
}
