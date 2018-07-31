var playing_to = Number(document.getElementById('playing_to').textContent);
var gameover = false;

document.querySelector("input").addEventListener('change', function(){
    document.getElementById('playing_to').textContent = this.value;
    playing_to = Number(this.value);
});
document.querySelector("#b-player-1").addEventListener('click', function() {
   var score = Number(document.querySelector('#sp-player1-score').textContent);
   if (score === playing_to){
     document.querySelector('#sp-player1-score').style.color = "green";
     gameover = true;
     return;
   }
   if ( !gameover ){
     score += 1;
     document.querySelector('#sp-player1-score').innerHTML = "<strong>" + score + "</strong>";
  }

});

document.querySelector("#b-player-2").addEventListener('click', function() {
   var score = Number(document.querySelector('#sp-player2-score').textContent);
   if (score === playing_to){
     document.querySelector('#sp-player2-score').style.color = "green";
     gameover = true;
     return;
   }
   if (!gameover) {
     score += 1;
     document.querySelector('#sp-player2-score').innerHTML = "<strong>" + score + "</strong>";
   }
});


document.querySelector("#b-reset").addEventListener('click', function(){
  document.querySelector('#sp-player1-score').innerHTML = "<strong>" + "0" + "</strong>";
  document.querySelector('#sp-player2-score').innerHTML = "<strong>" + "0" + "</strong>";
  document.querySelector('#sp-player2-score').style.color = "black";
  document.querySelector('#sp-player1-score').style.color = "black";
  gameover = false;
});
