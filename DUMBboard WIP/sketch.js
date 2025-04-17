//function cloudPlayer(pX, pY, pW, pH, pDistance){
   
  //push();
   // noStroke();
    //fill(255); // greyscale white
    //ellipse(pX, pY, pW, pH); // middle bump
    //ellipse(pX - pDistance*2 , pY + pDistance, pW, pH); // left bump
    //ellipse(pX + pDistance, pY + pDistance, pW, pH);  // right bump
  //pop();
//}


// variables
  
  // screen variables
  // 1 is Main Game
  // 2 is BSOD Game
  // 3 is Game Over
var screen = 1;

  // cloudPlayer variables
let pressedKeys = {};
let xPlayer;
let yPlayer;

let cloudW = 40;
let cloudH = 40;
let cloudOffset = 10;

  // imported media
let windowsBG;
let windowsBSOD;
let gameover;
let click;

  // button variables
let bX;
let bY;
let bW = 100;
let bH = 100;
let bR;
let bG;
let bB;
let bStroke = 4;

  // array creation of killer & variables
let killers = {};
killers.x = 50;
killers.y;
killers.w;
killers.h;
killers.c = 'white';
killers.total = 15;
killers.speed = 10;

// preload media
function preload(){
  windowsBG = loadImage('Windows Background Classic.jpg');
  windowsBSOD = loadImage('Windows Blue Screen.png');
  gameover = loadImage('game over screen.jpg');
  click = loadSound('click.wav');
}


function setup() {
  createCanvas(600, 400);
  
  // DUMBboard text deets
  let dumbBoard = createElement('body', 'DUMBboard');
  dumbBoard.style('color', 'white');
  dumbBoard.position(5, 1); 
  
  // player deets
  xPlayer = width/2
  yPlayer = height/2
  cloudPlayer = new Player(xPlayer, yPlayer);
  
  // rect mode
  rectMode(CENTER);
  
  // audio
  click.setVolume(1);
  click.play();
  
  // button variables value set
  bX = random(50, width-50);
  bY = random(50, height-50);
  bR = random(0, 255);
  bG = random(0, 255);
  bB = random(0, 255);
  
  // killer deets
    // my brain does not understand arrays rn, im taking the win that i'm understanding objects better and just gonna do it the inefficient way for now
  killer1 = new Killer(killers.x, killers.y, killers.w, killers.h);
  killer2 = new Killer(killers.x, killers.y, killers.w, killers.h);
  
  //theKillers = new Killer();
  
  // killer variables value set
  //for(let i = 0; i < killers.total; i++){
    //theKillers[i]();
  
      //killer1 = new Killer(killers.x, killers.y);
  //doing an array instead of the above
 // }
  //ykStart = random(40, height-40); 
  //kW = random(5, 15); 
  //kH = random(30, 50);
  // kWhite = color(225);
  
  //setInterval(stateChange, 1000);
}

class Killer {
  constructor(x, y, w, h){
    this.x = killers.x;
    this.y = killers.y;
    this.w = killers.w;
    this.h = killers.h;
    killers.y = random(40, height -40);
    killers.w = random(10, 20);
    killers.h = random(45, 60);
  }
  spawn(){
    push();
      noStroke();
      fill(killers.c);
      rect(killers.x, killers.y, killers.w, killers.h);
    pop();
  }
  update(){
    if(yPlayer + cloudOffset > 0 && yPlayer - cloudOffset < height && xPlayer + cloudOffset > 0 && xPlayer - cloudOffset < width){
      killers.x += killers.speed;
    }
  }
}


// regular schmegular draw function for bg
function draw() {
  
  // dumbboard border
  background(10);
  
   // game state screen
  if(screen == 1){
    screenMainGame();
  } else if (screen == 2){
    screenBSOD();
  } else if (screen == 3){
    screenGameOver();
  }
  
  // player stuffs
  cloudPlayer.update();
  cloudPlayer.draw();
  
}

// wasd movement that supports diagonal movement that doesn't exceed speed of lateral movement
function keyPressed() {
  pressedKeys[key] = true;
}

function keyReleased() {
  delete pressedKeys[key];
}
  
class Player {
  constructor(pX, pY) {
    this.x = pX;
    this.y = pY;
    this.speed = 5;
  }
  
  spawn(pX, pY, pW, pH, pDistance){
    push();
      noStroke();
      fill(255); // greyscale white
      ellipse(pX, pY, pW, pH); // middle bump
      ellipse(pX - pDistance*2 , pY + pDistance, pW, pH); // left bump
      ellipse(pX + pDistance, pY + pDistance, pW, pH);  // right bump
    pop();
  }
  
  update(){
    let mvmt = createVector(0, 0);
    
    if(pressedKeys.a) {
      mvmt.x -= 1;
    }
    if(pressedKeys.d) {
      mvmt.x += 1;
    }
    if(pressedKeys.w) {
      mvmt.y -= 1;
    }
    if(pressedKeys.s) {
      mvmt.y += 1;
    }
    
    mvmt.setMag(this.speed);
    
    this.x += mvmt.x;
    this.y += mvmt.y;
}
  
  
draw(){
   
  // cloudPlayer moveable with wasd
    cloudPlayer.spawn(this.x, this.y, cloudW, cloudH, cloudOffset);
    cloudPlayer.update();

  // Main Game Screen
  if(screen == 1){
    
    // change screen to BSOD if cloud player leaves screen
    if(this.y + cloudOffset < 0 || this.y - cloudOffset > height || this.x + cloudOffset < 0 || this.x - cloudOffset > width){
    
      console.log("screen changed to BSOD");
      screen = 2;
     }
    
    // THE LEFT AND TOP SIDE OF THE BUTTON PRESSING NEEDED THE MINUS OF THE SIDE BECAUSE IM USING RECT MODE CENTER OMGGGG,,,,
    // ernie i owe you my life :pray:
    if(mouseX > bX - bW/2 && mouseX < bX + bW/2 && mouseY > bY - bH/2 && mouseY < bY + bH/2 && mouseIsPressed && this.x > bX - bW/2 && this.x < bX + bW/2 && this.y > bY - bH/2 && this.y < bY + bH/2){
    
      click.play();
    
      if(bW <= 20 || bH <= 20){
         bW = 100;
         bH = 100;
         }
    
      // when pressed, shrink the button, randomize location and color, and call it again with the new values
      bW = bW - 5;
      bH = bH -5;
    
      bX = random(50, width-50);
      bY = random(50, height-50);
      bR = random(0, 255);
      bG = random(0, 255);
      bB = random(0, 255);
    
      button(bX, bY, bW, bH, bR, bG, bB, bStroke);
  }
    } else if(screen == 2){
      
      killer1.spawn(killers.x, killers.y, killers.w, killers.h);
      killer2.spawn(killers.x, killers.y, killers.w, killers.h);
      // killers don't move until after cloudPlayer comes back on screen (WHY WONT IT MOVE NOW :SOBS:)
        // and now it Does move but regardless of cloudPlayer location sighs. even when i moved the if function out of update and just had it run here,,,
      killer1.update();
      killer2.update();
     
      
      // OK SO -- create an object for the killers, then use an array to spawn many at the same time??
       // for(let j = 0; j < killers.total; j++){
          //theKillers.push(new Killer(killers.x, killers.y, killers.w, killers.h, killers.c));
          //killers[j].spawn(killers.x, killers.y, killers.w, killers.h, killers.c)
          //}
          
       
      
      // change screen to game over if cloud player touches any killers 
      // maybe need to do this the other way so its if the killer is of a certain parameter (within the cloudplayer) as opposed to the other way around which is how we have it now
       
      // if(this.y + cloudOffset < killers.y + killers.h/2 && this.y - cloudOffset > killers.y - killers.h/2 && this.x + cloudOffset < killers.x + killers.w/2 && this.x - cloudOffset > killers.x - killers.w/2){
          //console.log("screen changed to game over");
          //screen = 3;
       // }
     
     // if(killers.y + killers.h/2 < this.y + cloudOffset || killers.y - killers.h/2 > this.y - cloudOffset && killers.x + killers.w/2 < this.x + cloudOffset || killers.x - killers.w/2 > this.x - cloudOffset && dist(killers.x, killers.y, this.x, this.y) < 5){
         // console.log("screen changed to game over");
         // screen = 3;
        // }
      
        
      
    } else if(screen == 3){
          
      // make a button for getting back to main game screen after i can consistently enough get to this screen to be able to see hwat the fuck im doing lol
        // pressing yes takes you to 
      
      }
    }       
}

// button function deets
function button(xPos, yPos, bWidth, bHeight, colR, colG, colB, lineW){
  
  push();
    strokeWeight(lineW);
    fill(colR, colG, colB);
    rect(xPos, yPos, bWidth, bHeight);
    fill(colR+50, colG+20, colB-50);
    ellipse(xPos, yPos, bWidth/2);
  pop();
}

//the killer rectangles muahaha
//function killer(xStartPos, yStartPos, kWidth, kHeight, kColor){
  
 // push();
  //  noStroke();
  //  fill(kColor);
  //  rect(xStartPos, yStartPos, kWidth, kHeight);
 // pop();
//}

// game screen deets
function screenMainGame(){
  
  image(windowsBG, 5, 20, width-10, height-40);
  
  push();
    noLoop();
    button(bX, bY, bW, bH, bR, bG, bB, bStroke);
    loop();
  pop(); 
}

function screenBSOD(){
  
  image(windowsBSOD, 5, 20, width-10, height-40);
}

function screenGameOver(){
  
  image(gameover, 5, 20, width-10, height-40);
}







// the following functions are for holding things im no longer using but might come back to idk
function spawnKiller(){
  
  ykStart = random(40, height-40); 
  kW = random(5, 15); 
  kH = random(30, 50);
  killers(xkStart, ykStart, kW, kH, kWhite);
}

function stateChange(){
  
  console.log('the state is changinggg')
  state = !state;
}

function oldStuffs(){
  
  if(keyIsPressed){
          ykStart = random(40, height-40); 
          kW = random(5, 15); 
          kH = random(30, 50);
          killers(xkStart, ykStart, kW, kH, kWhite);
        } else{
         
        }
  
   while(kSpawn < 100){
      killers(xkStart, ykStart, kW, kH, kWhite);
      console.log("im doing smthng,,, anything");
      
      kSpawn += 1;
   }
}

// in case i give up on my player cloud dreams lol
function oldPlayer(){
  // smaller screen moveable with wasd
  strokeWeight(3);
  fill(255, 127); // greyscale white w/ 127 = 50% transparency
  rect(this.x, this.y, width/6);    
}
