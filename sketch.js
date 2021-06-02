var sheep, sheepImage
var wolf, wolfImage
var backgr0und, backgroundImage
var backgr1und
var backgr2und
var life1, life2, life3, livesImage
var gameState = "all lives left"
var livesLeft = 3;
var wolfGroup
var edges
var wolfSpawn
var score

function preload() {
  sheepImage = loadImage("sheep.png");
  
  wolfImage = loadImage("wolf.png");
  
  backgroundImage = loadImage("background.png");
  
  livesImage = loadImage("lives.png");
}

function setup() {
  createCanvas(1000, 500);
  
  sheep = createSprite(500, 250, 10, 20);
  sheep.addImage(sheepImage);
  sheep.scale=0.3
  
  life1 = createSprite(20, 20, 20, 20);
  life2 = createSprite(50, 20, 20, 20);
  life3 = createSprite(80, 20, 20, 20);
  life1.addImage(livesImage);
  life2.addImage(livesImage);
  life3.addImage(livesImage);
  life1.scale=0.3;
  life2.scale=0.3;
  life3.scale=0.3;
  
  wolfGroup = createGroup();

  backgr0und = createSprite(375, 250, 500, 500);
  backgr0und.addImage(backgroundImage);
  backgr0und.scale = 2.75
  backgr0und.depth=backgr0und.depth-1000

  backgr1und = createSprite(1125, 250, 500, 500);
  backgr1und.addImage(backgroundImage);
  backgr1und.scale = 2.75
  backgr1und.depth=backgr1und.depth-1000

  backgr2und = createSprite(1875, 250, 500, 500);
  backgr2und.addImage(backgroundImage);
  backgr2und.scale = 2.75
  backgr2und.depth=backgr2und.depth-1000

  
}

function draw() {
  background(220);
  
  sheep.x=sheep.x+5

  scoreAssist1 = camera.position.x-500

  score = Math.round(scoreAssist1/50)

  camera.position.x = camera.position.x+5

  wolfSpawn=camera.position.x-550

  life1.x=life1.x+5
  life2.x=life2.x+5
  life3.x=life3.x+5

    spawnWolf();
  
  if (keyDown(UP_ARROW)) {
    sheep.y=sheep.y-5;
  }
  
  if (keyDown(DOWN_ARROW)) {
    sheep.y=sheep.y+5;
  }
  
  if (wolfGroup.isTouching(sheep) && gameState === "all lives left") {
    life3.destroy();
    wolf.destroy();
    livesLeft=livesLeft-1;
    gameState = "2 lives left"
  }
  
  if (wolfGroup.isTouching(sheep) && gameState === "2 lives left") {
    life2.destroy();
    wolf.destroy();
    livesLeft=livesLeft-1;
    gameState = "1 life left"
  }
  
  if (wolfGroup.isTouching(sheep) && gameState === "1 life left") {
    life1.destroy();
    wolf.destroy();
    livesLeft=livesLeft-1;
    gameState = "No lives left"
  }

  cameraPos = camera.position.x-875

  if (backgr0und.x===cameraPos) {
    backgr0und.x=backgr0und.x+2250
  }

  if (backgr1und.x===cameraPos) {
    backgr1und.x=backgr1und.x+2250
  }

  if (backgr2und.x===cameraPos) {
    backgr2und.x=backgr2und.x+2250
  }
  
  if (wolfGroup.x>50) {
    wolf.destroy();
  }
  console.log(wolfGroup.x)

  scoreX=camera.position.x+270
    
  drawSprites();
  textSize(40)
  fill("black")
  text("Score: "+score,scoreX, 75)
  
  if (livesLeft===0 && gameState==="No lives left") {
    background("black")
    textSize(50);
    stroke("white");
    fill("white");
    text("Game Over", 135, 250);
  }
}

function spawnWolf() {
  if (frameCount % 80 === 0) {
    wolf = createSprite(wolfSpawn, 250, 30, 20);
    wolf.y=sheep.y
    wolf.addImage(wolfImage);
    wolf.scale=0.4
    wolf.velocityX = 15;
    wolf.depth=wolf.depth+100
    wolfGroup.add(wolf);
    wolf.lifetime=100;
  }
}