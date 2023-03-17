var trex, trex_running, edges;
var groundImage, ground;
var invisibleGround;
var cloud;
var cloudimage;
var obstacle;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score= 0;
var cloudGroup;
var obstaclesGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var trex_collide;
var restard,restardimg;
var gameOver, gameOverimg;
var jumpsound;
var dieSound;
var checkPointSoun;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collide= loadImage("trex_collided.png")
  restardimg=loadImage("restart.png");
  gameOverimg=loadImage("gameOver.png");
  groundImage = loadImage("ground2.png")

  cloudimage= loadImage("cloud.png")
  obstacle1= loadImage("obstacle1.png")
obstacle2= loadImage("obstacle2.png")
obstacle3= loadImage("obstacle3.png")
obstacle4= loadImage("obstacle4.png") 
obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
jumpsound=loadSound("jump.mp3")
dieSound=loadSound("die.mp3")
checkPointSoun=loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(600,200);
  obstaclesGroup=new Group();
  cloudGroup=new Group();
  restard=createSprite(300, 140);
  restard.scale=0.5
  gameOver=createSprite(300,100);
  gameOver.scale=2.5
  restard.addImage(restardimg);
  gameOver.addImage(gameOverimg);
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collide);
  edges = createEdgeSprites();
  
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  trex.debug=false
  trex.setCollider("circle", 0, 0, 40)
  ground=createSprite(200,180,400,20)
  ground.addImage(groundImage)
  invisibleGround=createSprite(200, 190, 400, 10)
  invisibleGround.visible=false
}             


function draw(){
  //establecer color de fondo.
  background("white");
  text("puntuacion: " + score,500, 50)
 
  if(gameState===PLAY){
    ground.velocityX = -(4+3*score/100)
    score=score+Math.round(frameCount/60)
    if(score>0 && score%100===0){
      checkPointSoun.play()
    }
    restard.visible=false
    gameOver.visible=false
    if(ground.x<0){
      ground.x=ground.width/2
    }
    if(keyDown("space") && trex.y>=100){
      trex.velocityY = -10;
      jumpsound.play()

    }
    spawnClouds();
    spawnObstacle();
    trex.velocityY = trex.velocityY + 0.5;
    if(obstaclesGroup.isTouching(trex)){
      gameState=END
      dieSound.play()
    }
  }
  else if(gameState===END){
    ground.velocityX=0
    trex.changeAnimation("collided", trex_collide)
    obstaclesGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.velocityY=(0);
    restard.visible=true
    gameOver.visible=true
  }
  

  
 
  
 
  
  
  trex.collide(invisibleGround)
  if(mousePressedOver (restard)){
    reset()
  }
  drawSprites();
  
}
function spawnClouds(){
    if(frameCount % 60 === 0){
      cloud= createSprite(600, 100, 40, 10)
      cloud.velocityX = -3
      cloud.addImage(cloudimage)
      cloud.y=Math.round(random(10, 60))
      cloud.lifetime=200
      cloud.depth= trex.depth
      trex.depth=trex.depth+1
      cloudGroup.add(cloud)


    }
}
function spawnObstacle(){
  if(frameCount % 60 === 0){
    obstacle= createSprite(600, 165, 10, 40)
    obstacle.velocityX = -(6+score/100)
    var rand=Math.round(random(1,6))
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3:obstacle.addImage(obstacle3);
            break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;                               
    }
    obstacle.scale=0.5
    obstacle.lifetime=300 
    obstaclesGroup.add(obstacle)
  }
}
function reset(){
  gameState=PLAY
  restard.visible=false
  gameOver.visible=false
  trex.changeAnimation("running", trex_running)
  obstaclesGroup.destroyEach()
  cloudGroup.destroyEach()
  score=0
}