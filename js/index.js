var PaperBtn = document.getElementById("PaperBtn");
var ScissorsBtn = document.getElementById("ScissorsBtn");
var RockBtn = document.getElementById("RockBtn");
var GameResetBtn =document.getElementById("GameResetBtn");
var NewGameBtn=document.getElementById("NewGameBtn");

var NumberOfRounds = document.getElementById("NumberOfRounds")

var PlayerChoice = document.getElementById("PlayerChoice");
var ComputerChoice = document.getElementById("ComputerChoice");
var PlayerScore = document.getElementById("PlayerScore");
var ComputerScore = document.getElementById("ComputerScore");

var Number_Of_Rounds;
var Round_Count=0;

var Player = { pick: '', Score: 0 };
var Computer = { pick: '', Score: 0 };
var GameStatus = false;
var resultsArray = [];

// Buttons
var buttons=document.getElementsByClassName("player-move");

var a = [];
for (let i=0;i<buttons.length;i++){
  a[i]=buttons[i].getAttribute("data-move");
  buttons[i].addEventListener('click', function( ){
    GameRun(a[i]);
  });
}

document.getElementById('close_X').addEventListener('click', modalClose);

NewGameBtn.addEventListener("click", function(){
    NewGame();
    GameReset();
});

GameResetBtn.addEventListener("click", function(){
     GameReset();
});

function GameRun(PlayerChoice) {
      if (GameStatus === true) {
        Player.pick = PlayerChoice;
        Computer.pick = ComputerPick();
        Failure_Defeat(Player.pick,Computer.pick);
        Display();
        addResult();
        GameOver();

      } else {alert("Rozpocznij Nową Grę");}
}

// Function nowa gra
function NewGame() {
  Number_Of_Rounds = parseInt(prompt("Podaj liczbę Rund"));
  GameStatus = true;

  NumberOfRounds.innerHTML = "Ilość Rund" + " " + Number_Of_Rounds;


}
//Function to generate choice by computer

function ComputerPick () {
    var array_pick = ["Kamień", "Papier", "Nożyce"];
    var pick = Math.floor((Math.random()*3));
    return array_pick[pick];
}

function addResult() {
  resultsArray.push({ round: Round_Count, compPick: Computer.pick, playerPick: Player.pick, result: Player.Score + ":" + Computer.Score });
}

//Function - determination success - failure
function Failure_Defeat (Player1,Computer1){
      var Player1;
      var Computer1;
      Round_Count = Round_Count + 1;

      if (Player1 === Computer1) {return "Remis";}
      else if (Player1 === "Kamień" && Computer1 === "Nożyce" || Player1 === "Papier" && Computer1 === "Kamień" || Player1 === "Nożyce" && Computer1 === "Papier") { return Player.Score = Player.Score + 1;}
      else {return Computer.Score = Computer.Score +1;}

 }

function Display() {
    PlayerChoice.innerHTML = "Wybór Gracza:" + " " + Player.pick;
    ComputerChoice.innerHTML = "Wybór Komputera:" + " " + Computer.pick;
    PlayerScore.innerHTML = "Wynik Gracza:" + " " + Player.Score;
    ComputerScore.innerHTML = "Wynik Komputera:" + " " + Computer.Score +" "+ Round_Count;
}

function GameReset() {
    Player.Score = 0;
    Computer.Score = 0;
    PlayerChoice.innerHTML = "Wybór Gracza:";
    ComputerChoice.innerHTML = "Wybór Komputera:";
    PlayerScore.innerHTML = "Wynik Gracza:" + " " + Player.Score;
    ComputerScore.innerHTML = "Wynik Komputera:" + " " + Computer.Score;
    Round_Count = 0;
}

function GameOver() {
  var final_result='';
  if (Round_Count === Number_Of_Rounds) {
        if (Player.Score > Computer.Score) {
            final_result="Game OVER - Zwycięstwo";
        } else if (Computer.Score > Player.Score) {final_result="Game OVER - Porażka";}
      else {final_result="Game OVER - Remis";}
      GameReset();
      GameStatus = false;
      Number_Of_Rounds =0;
      NumberOfRounds.innerHTML = "Ilość Rund" + " " + Number_Of_Rounds;

      var tbody = '';
      for(var i=0; i<resultsArray.length;i++) {
        var tr = "<tr><td>"+resultsArray[i].round+"</td><td>"+resultsArray[i].playerPick+"</td><td>"+resultsArray[i].compPick+"</td><td>"+resultsArray[i].result+"</td></tr>"
        tbody = tbody + tr;
      }
      document.querySelector("#resultsModal tbody").innerHTML = tbody;
      document.getElementById('final_result').innerHTML=final_result;
      modalOpen();
    }
}
function modalOpen(){
  document.querySelector(".modalResults").classList.add('show');
}

function modalClose() {
  document.querySelector(".modalResults").classList.remove('show');
}
