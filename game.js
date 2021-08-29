var gamePattern =[];
const buttonColors = ["red", "blue", "green", "yellow"];
var userClickedButton = [];
var level = 0;
var started = false;
function nextSequence(){
    userClickedButton = [];
    $('#level-title' ).text("Level "+ level);
    var number = Math.floor(Math.random() * 4);
    var randomChosenColor =  buttonColors[number];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSoound(randomChosenColor);
    level++;

}
$('.btn').click(function (){
    var userChosenColor = $(this).attr('id');
    userClickedButton.push(userChosenColor);
    $(this).addClass("pressed");
    setTimeout(()=>$(this).removeClass("pressed"), 100);
    playSoound(userChosenColor);
    checkAnswer(userClickedButton.length-1)

})

function playSoound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// function animatePress(currentColor){
//
// }

$(document).keydown(function (){
    if(!started) {
        started = true;
        $('#level-title' ).text("Level "+ level);
        nextSequence();
    }});

function checkAnswer(currentLevel){
    var userAnswer = userClickedButton[currentLevel];
    if(userAnswer === gamePattern[currentLevel]){
        console.log("you got it");
        if (userClickedButton.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(()=> nextSequence(), 1000);

        }
    }else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $('body').addClass(".game-over");
        setTimeout(()=>$('body').removeClass(".game-over"), 200);
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


