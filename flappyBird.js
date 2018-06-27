var cvs=document.getElementById("canvas");
var ctx=cvs.getContext("2d");


//load images
var bird= new Image();
var bg= new Image();
var fg= new Image();
var pipeNorth= new Image();
var pipeSouth= new Image();
 
bird.src="images/bird.png";
bg.src="images/bg.png";
fg.src="images/fg.png";
pipeNorth.src="images/pipeNorth.png";
pipeSouth.src="images/pipeSouth.png";


var gap = 105;
var bx = 10;
var by = 150;
var gravity = 1.5;
var score = 0;

document.addEventListener("keydown",moveUp);

function moveUp(){
    by -= 35;
    fly.play();
}

//pipe cooerdinates

var pipe=[];
pipe[0]={
    x : cvs.width,
    y : 0
};

//audio

var fly = new Audio();
var scor = new Audio();

fly.src= "sounds/fly.mp3";
scor.src = "sounds/score.mp3";



//draw images

function draw(){
   
   ctx.drawImage(bg,0,0);

   for(var i=0; i<pipe.length;i++){
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+pipeNorth.height+gap);
   
    pipe[i].x--;
    
    if(pipe[i].x == 0){
        pipe.push({
            x : cvs.width,
            y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
        });
    }

    //detect collision

    if(bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width 
       && (by <= pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y+pipeNorth.height+gap)
       || (by + bird.height >= cvs.height-fg.height)){
           location.reload(); //reload the page
       }
    
      if(pipe[i].x ==5){
          score++; 
          scor.play();
      }
   }
   
   ctx.drawImage(fg,0,cvs.height-fg.height);
   ctx.drawImage(bird,bx,by);

   by += gravity;

   ctx.fillStyle = "#000";
   ctx.font = "20px verdana";
   ctx.fillText("Score : "+score,10,20);

   requestAnimationFrame(draw);

}

draw();
