// alert("Hello")
// $("h1").text("Hello !! Bye Bye");
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];//record the game pattern
var userClickedPattern=[];//record the user pattern
var level=0;//record game level
var started=false;
$(document).keydown(function(){
    if(!started){//if start is false then only restart
        $("#level-title").text(level+"level");
        nextSequence();
        started=true;
    }
    
})
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text(level+"level");
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // var audio = new Audio("sounds/"+randomChosenColour+'.mp3');
    // audio.play();
    playsound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log("gamepattern"+gamePattern)
}   
$(".btn").click(function(e){
    var userChosenColour=e.currentTarget.id;
    userClickedPattern.push(userChosenColour)
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
    console.log("userclickedpattern"+userClickedPattern)
})
function playsound(name){
    var audio = new Audio("sounds/"+name+'.mp3');
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success")
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(nextSequence,1000);
        }
    }else{
        console.log("wrong")
        playsound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over") 
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        started=false;
        level=0;
        gamePattern=[];
    }
}