var gameState = PLAY;
var PLAY = 1;
var END = 0;
var survivalTime;
var monkey, monkey_running, monkey_collide;
var banana, bananaImage, Obstacle, ObstacleImage, obstacle1;
var FoodGroup, ObstaclesGroup;
var score;
var ground, inviground, groundimage;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  ObstaclesImage = loadImage("obstacle.png");

}



function setup() {

  monkey = createSprite(50, 120, 60, 50);
  monkey.addAnimation("moving", monkey_running);

  monkey.scale = 0.078;

  ground = createSprite(100, 190, 800, 20);
  ground.velocityX = 5;
  ground.x = ground.width / 2;

  inviground = createSprite(100, 190, 400, 10);
  inviground.visible = false;
  monkey.setCollider("rectangle", 0, 0, 460, monkey.height);
  monkey.debug = true;

  score = 0;
  FoodGroup = new Group();
  ObstaclesGroup = new Group();
  survivalTime = 0;

}


function draw() {
  background(180);
  if (keyDown("space")) {
    monkey.velocityY = -2;

  }

  text("Score: " + score, 300, 50);
  text("SurvivalTime: " + survivalTime, 200, 50)
  ground.velocityX = -(4 + 3 * score / 100);


  ground.velocityX = -(4 + 3 * score / 100);
  score = score + Math.round(getFrameRate() / 60);
  survivalTime = survivalTime + Math.round(getFrameRate() / 60)
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  //jump when the space key is pressed

  //add gravity
  monkey.velocityY = monkey.velocityY + 0.1;
  monkey.collide(inviground);

  //spawn the Food
  spawnFood();

  //spawn obstacles on the ground
  spawnObstacles();

  if (ObstaclesGroup.isTouching(monkey)) {
    monkey.scale = monkey.scale - 0.001
  }


  if (FoodGroup.isTouching(monkey)) {
    monkey.scale = monkey.scale + 0.0011;
  }








  //set lifetime of the game objects so that they are never destroyed
  ObstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);







  drawSprites();


}


function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var Obstacle = createSprite(600, 165, 10, 40);
    Obstacle.velocityX = -(6 + score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        Obstacle.addImage(ObstaclesImage);
        break;
      case 2:
        Obstacle.addImage(ObstaclesImage);
        break;
      case 3:
        Obstacle.addImage(ObstaclesImage);
        break;
      case 4:
        Obstacle.addImage(ObstaclesImage);
        break;
      case 5:
        Obstacle.addImage(ObstaclesImage);
        break;
      case 6:
        Obstacle.addImage(ObstaclesImage);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    Obstacle.scale = 0.11;
    Obstacle.lifetime = 300;

    //add each obstacle to the group
    ObstaclesGroup.add(Obstacle);
  }
}

function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(30, 120));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;


    FoodGroup.add(banana);
  }






















}