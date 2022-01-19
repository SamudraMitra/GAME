var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var level=0;
var check=true;
function nextSequence()
{
  level=level+1;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
})
function playSound(name)
{
  $("#"+name).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour)
{
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
  $("."+currentColour).removeClass("pressed");
},100);
}
$("body").keypress(function(){
  if(check==true)
  {
    check=false;
    nextSequence();
    $("h1").text("Level "+level);
  }
  $("body").click(function(){
    if(check==true)
    {
      check=false;
      nextSequence();
      $("h1").text("Level "+level);
    }
});
function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
  {
    if(currentLevel==level-1)
    {
      setTimeout(function(){
        nextSequence();
        userClickedPattern=[];
      },1000);
    }
  }
  else
  {
    var audiow = new Audio("sounds/wrong.mp3");
    audiow.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key/touch anywhere to Restart");
    startover();
  }
}
function startover()
{
  level=0;
  check=true;
  gamePattern=[];
  userClickedPattern=[];
}
