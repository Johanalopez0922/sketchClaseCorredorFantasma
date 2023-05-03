var towerImg, tower; 
var doorImg, door, doorsGroup; 
var climberImg, climber, climbersGroup; 
var ghostImg, ghost; 
var invisibleBlockGroup, invisibleGroup, invisibleBlock; 
var spookySound; 
var gameState = "play"; 

function preload(){
  towerImg = loadImage("./tower.png"); 
  doorImg = loadImage("./door.png"); 
  climberImg = loadImage("./climber.png");
  ghostImg = loadImage("./ghost-standing.png");
  spookySound = loadSound("./spooky.wav"); 
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();

  tower = createSprite(300,300); 
  tower.addImage("tower", towerImg); 
  tower.velocityY = 1; 

  ghost = createSprite(200,200, 50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group(); 
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}


function draw() {
  background(0);
  
  if (gameState === "play") {
    
    if(keyDown("left_arrow")){
         ghost.x = ghost.x -3; 
         //ghost.x -=3; 
    }

    if(keyDown("right_arrow")){
        ghost.x +=3;
    }
   
    if(keyDown("space")){  
      ghost.velocityY -=3;
    }
  
    ghost.velocityY = ghost.velocityY + 0.8;
     
    //escribir una condición para desplazar infinitamente la torre

    if(tower.y > 400){
      tower.y = 300; 
    }
    
    spawnDoors();

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0; 
    }

    if(invisibleBlockGroup.isTouching(ghost)){
      ghost.destroy(); 
      gameState = "end";
    }

  
  drawSprites();
}
  if(gameState === "end"){
    stroke("yellow"); 
    fill("yellow"); 
    textSize(30); 
    text("FIN DEL JUEGO", 230, 250); 
   
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
   door = createSprite(200, -50); 
   climber = createSprite(200, 10); 
   invisibleBlock = createSprite(200, 15); 

   invisibleBlock.width = climber.width; 
   invisibleBlock.height = 2; 
  
  //agregar la función random
    door.x = Math.round(random(120, 400)); 
    climber.x = door.x; 
    invisibleBlock.x = door.x; 

    door.addImage("door", doorImg); 
    climber.addImage("climber", climberImg); 
    
    door.velocityY = 1; 
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1; 

    //cambiar la profundidad del fantasma y de la puerta
    
     ghost.depth = door.depth; 
     ghost.depth += 1;      
    
    //asignar lifetime a obstacle.lifetime = 300; aquí los obstáculos son la puerta, la barandilla y el bloque invisible
    door.lifetime = 800; 
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    //agregar cada obstáculo al grupo obstaclesGroup.add(obstacle);aquí los obstáculos son la puerta, la barandilla y el bloque invisible
    
    doorsGroup.add(door); 
    climbersGroup.add(climber);
    invisibleBlock.debug = true; 
    invisibleBlockGroup.add(invisibleBlock); 
  
  }
}

