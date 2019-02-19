let playing;
let score = 5;
let trialsValue;
let fruits = ["apple","banana","cherries","grapes","mango","orange","peach","pear","watermelon"];
let step;
let action;
$(function(){//execute when the page is loaded
    $("#start").click(function(){//execute on click
        if(playing){//if already in play mode
            location.reload();//reload the page
        }else{
            $("#gameover").hide();//hide the gameover div
            playing = true;
            $("#btnText").html("Restart Game");//change text of start btn
            score = 0;
            $("#scorevalue").html(score); //changne value of score div
            $("#trials").show()//show trial div
            trialsValue = 3;
            addLife();//add lives to trail box
            playAction(); // play mode
        }
    });
    
$("#fruit").mouseover(function(){//execute on mouseover
                score++;
                $("#scorevalue").html(score);
//               $("#slice")[0].play();
                document.getElementById("slice").play();
                clearInterval(action);
                $("#fruit").hide('explode',400);
                setTimeout(playAction,450);
});

function chooseFruit(){//select fruit from fruits array
    $("#fruit").attr('src',' images/'+fruits[Math.round(8*Math.random())]+'.png')
}

function playAction(){
    $("#fruit").show();//show fruit img
    chooseFruit();
    //position fruit randomaly along x axis
    $("#fruit").css({'top':-50,'left':Math.round(500*Math.random())});
    
    step = 2+ Math.round(4*Math.random());//step for falling
    
    action = setInterval(function(){//change vertical pos of fruit aftr 10ms
        
        $("#fruit").css('top',$("#fruit").position().top+step);
        //check if fruit has passed the down limit 
        if($("#fruit").position().top> $("#FruitDisplay").height()){
            //if not visible
            if(trialsValue > 1){//check nmbr of lives
                $("#fruit").show();
                chooseFruit();
                $("#fruit").css({'top':-80,'left':Math.round(500*Math.random())});
                step = 2+ Math.round(4*Math.random());
                trialsValue--;
                addLife();
            }else{//zero live
                close();
            }
        }
    },10);
}
function close(){
    playing = false;
    clearInterval(action);
    $("#finalScore").html(score);
    $("#trials").hide();
    $("#gameover").show();
    $("#btnText").html("Start Game");
}    
//Add heart or life box;
function addLife(){
    $("#trials").empty();//empty trial div
    for( let i = 0; i<trialsValue; i++){//add heart img to trial box
        $("#trials").append('<img src="images/heart.png" class="life">')
    }
}
});
