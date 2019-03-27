// global variables initiated
var total=0, selectCount=0, tempTotal=0, player=1, games=0, previousTotal;
//player scores will be kept in scoreboard div using new arrays
allScores = new Array();
allScores2 = new Array();

//making new arrays to hold total tile value and score of leftover tiles
tileTotal = new Array();
currentTiles = new Array(1,2,3,4,5,6,7,8,9);
//this function will keep track of what tiles have been selected 
// and only allow user to select correct total based on dice
    
function select(obj) {
    //exit this function if the temp total == dice total
    if(tempTotal == total || total == 0){
        if(previousTotal == total)
        {

        }
        else
        {
            alert("You need to roll the dice!");
            return;
        }        
        
    }
    
    // sum current tiles
    tempTotal=0;
    var img = document.getElementById(obj);
    tileTotal[selectCount]=obj;
    for (var i=0; i<tileTotal.length; i++) {
        tempTotal += tileTotal[i];
    }
    //alert(tempTotal);

    if (tempTotal<total) {
        img.style.visibility="hidden";

        //change the array holding current tiles
        // to input a zero for the original value
        currentTiles.splice(obj-1,1,0);
        
        //increase selectCount which tracks how many tiles are selected
        selectCount ++;
    }
    else if (tempTotal==total) {
        //show roll button in leftside div.
        document.getElementById("leftside").style.visibility="visible";
        img.style.visibility="hidden";

        //change the array holding current tiles
        // to input a zero for the original value
        currentTiles.splice(obj-1,1,0);

        //make our temporary tileTotal back to empty and reset selectCount to zero.  tileTotal = Array();
        selectCount=0;
        tileTotal = new Array(); 
        getScore();
    }
        
    else    {
        alert(tempTotal+" is a total beyond your roll.");
    }
    console.log(tempTotal, total, tileTotal);
}

//rolling the dice
function roll(){
        console.log("Roll button Clicked");
previousTotal = total;
 $("#reset").show();
    $("#endBtn").show();
var i = 1;                     

function animateDice () {           
   setTimeout(function () {    
      randomDiceSet();          
      i++;                    
      if (i < 10) {            
         animateDice();             
      }                       
   }, 50)
}

animateDice(); 
    

    // randomly choose dice
    rand = Math.floor((Math.random() * 6) + 1);
    rand2 = Math.floor((Math.random() * 6) + 1);
    
    path='images/dice/'+rand+'.png';
    path2='images/dice/'+rand2+'.png';
    document.images["die1"].src = path;
    document.images["die2"].src = path2;
   

    
    //get new totals of dice
    total = rand+rand2;
    //alert(rand + " + " + rand2 + " = " + total);

    document.getElementById("leftside").style.visibility="hidden";
}

function randomDiceSet() //the dice randomly change without setting the total
{
    /*
    // randomly choose dice
    rand3 = Math.floor((Math.random() * 6) + 1);
    rand4 = Math.floor((Math.random() * 6) + 1);
    
    path3='images/dice/'+rand3+'.png';
    path4='images/dice/'+rand4+'.png';
    document.images["die1"].src = path3;
    document.images["die2"].src = path4;
    */
}
 // get the current score, make sure we add 'score' to var list at top!
function getScore() {
    console.log("Getting score...");
    score=0;
    
    //loops through array and adds each element
    for (var i = 0; i < currentTiles.length; i++) {
        score += currentTiles[i];
    };

    //place the score in a paragraph with jquery command
    $("#score").text(score);

     //a nice animation or animated gift should be done 
    //instead of just this boring alert
    if (score==0) {
        playMusic("win"); //play ode to joy :D
        alert("You SHUT THE BOX! Sweet Rolling!");
        
        endGame();
    };
            
}

//reset tiles and clear array
function reset(){
        console.log("Reset button Clicked");
    for (var i = 0; i < tileTotal.length; i++) {
        c=tileTotal[i];
        document.getElementById(c).style.visibility="visible";
        currentTiles.splice(c-1,1,c); 
    }
    tileTotal = Array();
    selectCount=0;
}

//player scores will be kept in scoreboard div using new arrays
allScoresP1 = new Array();
allScoresP2 = new Array();
function endGame () {
    //put score in games paragraph depending on player 0 or 1
    //add player to var list at top set to 1 to start
    if (player==1){
        games ++;
        allScoresP1[games-1]=score;
        $("#p1Games").text(allScoresP1);
        player=2;
        //set color too player 2 to green
        $("#p2Color").css("color", "lightgreen");
        $("#p1Color").css("color", "white");
         //total the player scores for both conditionals
        // change #p1 to #p2 and allScoresP1[i] to allScoresP2[i] if player=2
        var temp=0;
        for (var i = 0; i < games; i++) {
            temp += allScoresP1[i];
            //console.log(score);
        };
        $("#p1").text(temp);
            
    }
    else {
        allScoresP2[games-1]=score;

        $("#p2Games").text(allScoresP2);
        player=1;
        //set color too player 1 to green
        $("#p1Color").css("color", "lightgreen");
        $("#p2Color").css("color", "white");
         //total the player scores for both conditionals
        // change #p1 to #p2 and allScoresP1[i] to allScoresP2[i] if player=2
        var temp=0;
        for (var i = 0; i < games; i++) {
            temp += allScoresP2[i];
        };
        $("#p2").text(temp);
            
    }
        
    // hid the reset button and end button and show all tiles
    $("#reset").hide();
    $("#endBtn").hide();
    currentTiles = Array(1,2,3,4,5,6,7,8,9);

    for (var i = 0; i < currentTiles.length; i++) {
        c=currentTiles[i];
        document.getElementById(c).style.visibility="visible";
    }

    //reset temporary tile total array and show roll button div
    tileTotal = Array();
    document.getElementById("leftside").style.visibility="visible";

    //I suggest to reset total to 0 and score to 45
        total = 0;
        score = 45;
    // as well as the dice images and #score text for new player

    path3='images/dice/0.png';
    path4='images/dice/0.png';
    document.images["die1"].src = path3;
    document.images["die2"].src = path4;
     // End the round if a player exceeds 45 and reset some items
    
}  // end of endGame()



// to be used with a body tag onload=...
function init() {
// loading up actions
$("#reset").hide();
$("#endBtn").hide();
$("#confetti").hide();
$("#p1Color").css("color", "lightgreen");
}

var snd;

function playMusic(music)
{
    if(music == "win")
    {
        console.log("Playing winning music");
        snd = new Audio("audio/win.mp3"); // buffers automatically when created
        snd.play();
        $("#confetti").show();
    }
    else if(music == "loose")
    {
        console.log("Playing loosing music");
        snd = new Audio("audio/loose.mp3"); // buffers automatically when created
        snd.play();
    }
    else if(music == "stop")
    {
        console.log("STOP THE MUSIC!!!");
        //snd = new Audio("audio/stop.mp3"); // buffers automatically when created
        snd.pause();
    }
    else
    {
        console.log("No music found: " + music);
        console.log("Use either 'win' or 'loose' for music choices");
    }
}


function hideCon()
{
    $("#confetti").hide();
    playMusic("stop");
}






