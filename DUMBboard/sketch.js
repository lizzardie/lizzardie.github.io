// see if theres a way to make the entire shape transparent together
//

 function cloudPlayer(pX, pY, pW, pH, pDistance){
   
  push();
    noStroke();
    fill(255); // greyscale white
    ellipse(pX, pY, pW, pH); // middle bump
    ellipse(pX - pDistance*2 , pY + pDistance, pW, pH); // left bump
    ellipse(pX + pDistance, pY + pDistance, pW, pH);  // right bump
  pop();
}

// variables
  // cloudPlayer variables
let player;
let pressedKeys = {};

let cloudW = 40;
let cloudH = 40;
let cloudOffset = 10;

  // imported media
let windowsBG;
let click;

  // button variables
let b;
let bX;
let bY;
let bW = 100;
let bH = 100;
let bR;
let bG;
let bB;
let bStroke = 4;

// preload media
function preload(){
  windowsBG = loadImage('Windows Background Classic.jpg');
  click = loadSound('click.wav');
}

function setup() {
  createCanvas(600, 400);
  
  // DUMBboard text deets
  let dumbBoard = createElement('body', 'DUMBboard');
  dumbBoard.style('color', 'white');
  dumbBoard.position(5, 1); 
  
  // player deets
  player = new Player(width/2, height/2);
  
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
  b = button(bX, bY, bW, bH, bR, bG, bB, bStroke);
}

// regular schmegular draw function for bg
function draw() {
  // computer bg screen + border
  background(10);
  
  image(windowsBG, 5, 20, width-10, height-40);
  
  push();
    noLoop();
    button(bX, bY, bW, bH, bR, bG, bB, bStroke);
    loop();
  pop();
  
  // player stuffs
  player.update();
  player.draw(); 
}

// wasd movement that supports diagonal movement that doesn't exceed speed of lateral movement
function keyPressed() {
  pressedKeys[key] = true;
}

function keyReleased() {
  delete pressedKeys[key];
}
  
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
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
   
  // cloudPlayer moveable with wasd
  push();
    cloudPlayer(this.x, this.y, cloudW, cloudH, cloudOffset);
  pop();
  
  // what if,,, i turned this player rectangle into a cloud,,,,,,,,,, what if i wanted to make my life soooooo hard *bites lip*
  // i did it but i had to give up on partial opacity b/c i couldn't find a way to make multiple shapes be not full opacity without overlapping and changing the opacity in their overlap (in drawing terms it's like i was using marker and it wouldn't let me make one stroke i had to use multiple)
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


// in case i give up on my player cloud dreams lol
function oldPlayer(){
  // smaller screen moveable with wasd
  strokeWeight(3);
  fill(255, 127); // greyscale white w/ 127 = 50% transparency
  rect(this.x, this.y, width/6);    
  
}
