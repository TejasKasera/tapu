  var mario;
  var platformGroup, obstacleGroup;
  var marioAnimation, obstacleAnimation, wallAnimation, groundAnimation;
  var flag;
  var LOSE=0;
  var PLAY=1;
  var WIN=2;
  var man1;
  var man2;
  var score = 0;
  var time = 300;
  var spaceCount=0;
  var coin;
  var modiIMG , modi;
  var nehru , nehruIMG;
  var sastri, sastriIMG;
  var prasad, prasadIMG;
  var obstacleCollide;
  var coinIMG;
  var coinGroup;
  var tejasIMG, tejas;
  var sd;
  var bulletIMG, bullet, bulletCount=0;
  var palace;
  var palaceIMG;
  var bak, bakIMG;
  var ob2, ob2IMG, ob2Group;
  var fire, fireIMG;
  var gameState=PLAY;

  
  function preload() {
  marioR= loadAnimation("tappu.png");
  marioRight= loadAnimation("tappu1.png");
  marioL= loadAnimation("tappu2.png");
  marioLeft= loadAnimation("tappu3.png");        
  marioDie= loadAnimation("mario5.png")
  obstacleAnimation=loadAnimation("obstacle1.png","obstacle2.png");
  wallAnimation=loadAnimation("platform1.png");
  ob2IMG = loadImage("o.png");
  ob3IMG = loadImage("mouse.png");
  groundAnimation=loadAnimation("grp.png");  
  flagAnimation=loadAnimation("flg.png");
  blastIMG = loadImage("blast.png");
  bakIMG = loadImage("back.jpg");
  palaceIMG = loadImage("palace.png");
  coin1IMG = loadImage("coin1.png");
  coin2IMG = loadImage("coin2.png");
  bulletIMG = loadImage("bullet.png");
  obstacleCollide = loadAnimation("obstacle1.png");
  jumpSound = loadSound("jump.mp3");
  coinSound = loadSound("coin.mp3");
  fire5Sound = loadSound("crackerSound.mp3");
  bulletSound = loadSound("bulletthrough.mp3");
  marioDieSound = loadSound("mariodie.mp3"); 
  fireIMG = loadAnimation("fire1.png","fire2.png","fire3.png");
  modiIMG = loadImage("modi.gif");
  nehruIMG = loadImage("nehru.jpeg");
  sastriIMG = loadImage("sastri.jpeg");
  prasadIMG = loadImage("prasad.jpeg");
  tejasIMG = loadImage("tejas.png");
  }

  function setup() {
  createCanvas(displayWidth,668);
  var countDistanceX = 0;
  var platform;
  var gap;

  mario = new Player();

  blast = createSprite(mario.spt.x,mario.spt.y,20,20);
  blast.addImage(blastIMG);
  blast.scale = 0.3;
  blast.visible = false;

  man1 = createSprite(100,20,20,20);
  man1.shapeColor = "black"
  man1.velocityX = 10;
  man1.visible = false;

  man3 = createSprite(1,-200,50000,10);

  man2 = createSprite(105,20,20,20);
  man2.shapeColor = "black"
  man2.visible = false;

  modi = createSprite(200,300,50,50);
  modi.addImage(modiIMG);
  modi.scale= 0.4;
  modi.visible = false;

  nehru = createSprite(450,300,50,10);
  nehru.addImage(nehruIMG);
  nehru.scale= 0.31;
  nehru.visible = false;

  sastri = createSprite(200,300,50,10);
  sastri.addImage(sastriIMG);
  sastri.scale= 0.31;
  sastri.visible = false;

  prasad = createSprite(450,300,50,10);
  prasad.addImage(prasadIMG);
  prasad.scale= 0.31;
  prasad.visible = false;

  tejas = createSprite(9000,500,50,50);
  tejas.addImage(tejasIMG);
  tejas.scale = 0.3;
  tejas.velocityX = -8;


  platformGroup= createGroup();
  obstacleGroup=createGroup();
  ob2Group=createGroup();
  coinGroup=createGroup();
  bulletGroup=createGroup();
 
  for (var i=0;i<26;i++)
	{
  frameRate(30);
  platform = new Platform(countDistanceX);
  platformGroup.add(platform.spt);
  gap=random([0,0,0,0,200]);
  countDistanceX = countDistanceX + platform.spt.width + gap; 
  if(i%1===0)
  {
  wall=new Wall(countDistanceX);
  platformGroup.add(wall.spt);
  }
  if(i%2==0)
  {
  obstacle= new Obstacle(countDistanceX);
  obstacleGroup.add(obstacle.spt);
  }
  }
  flag=createSprite(countDistanceX-410,height-220);
  flag.addAnimation("flagimg",flagAnimation);
  flag.scale=0.4;
  flag.setCollider("rectangle",0,0,120,100);

  palace = createSprite(countDistanceX-10,400,30,30);
  palace.addImage(palaceIMG);
  palace.scale = 1;

  man4 = createSprite(countDistanceX-10,200,30,200)
  man4.addAnimation("are",fireIMG)
  man4.visible = false;

  }

  function draw() {
  background('skyblue');
  translate(  -mario.spt.x + width/2 , 0);
  if(gameState==PLAY) {  
  if(obstacleGroup.isTouching(mario.spt) || mario.spt.y>height || time === 0) {  
  gameState=LOSE;
  mario.spt.shapeColor = "red";
  marioDieSound.play();

  } 
  
  if(bulletGroup.isTouching(ob2Group)){
  bulletGroup[0].destroy();
  ob2Group.destroyEach();
  score++;
  }


  if(bulletGroup.isTouching(tejas)){
    bulletGroup[0].destroy();
    tejas.remove();

    

    modi.x = tejas.x+10;
    modi.y = 300;
    modi.visible = true;

    nehru.x = tejas.x+200;
    nehru.y = 300;
    nehru.visible = true; 

    prasad.x = tejas.x+10;
    prasad.y = 400;
    prasad.visible = true;

    sastri.x = tejas.x+200;
    sastri.y = 400;
    sastri.visible = true;   

    

    score++;

   

    }

    if(mousePressedOver(modi)) {
      modi.visible = false;
    }

    

  if(bulletGroup.isTouching(obstacleGroup)){
  bulletGroup[0].destroy();
  obstacleGroup[0].destroy();
  score++;
  }

  if(flag.isTouching(mario.spt)) {
  gameState=WIN;
  mario.spt.shapeColor = "green";
  fire5Sound.play();
  }

  if(mario.spt.isTouching(coinGroup)){
  coinGroup[0].destroy();
  score=score+10;
  coinSound.play();
  }

  if(mario.spt.isTouching(man3)){
    mario.spt.y = 500;
  }

  if(man1.isTouching(man2)){
  man1.velocityX = 0;
  textSize(35);
  fill("black");
  text("Instructions :", 20 ,150);
  text("1. Pressing b will make the bullet go forward.", 20 ,200);
  text("2. Pressing v will make the bullet go backward.", 20 ,250);
  text("3. Game time is 5 minutes.", 20 ,300);
  text("4. pressing space the player jump.", 20 ,350);
  text("Who is our present prime minister ?", tejas.x ,200);


  if(frameCount%10===0){
  time = time-1;
  } }
  
  mario.applyGravity();
  mario.spt.collide(platformGroup);
       
  if (keyWentDown(LEFT_ARROW))  
  { 
  mario.spt.velocityX = -20;
  mario.spt.changeAnimation("mariog",marioLeft);
  }

  if (keyWentUp(LEFT_ARROW))  
  { 
  mario.spt.velocityX = 0;
  mario.spt.changeAnimation("mariof",marioL);
  }

  if (keyWentDown(RIGHT_ARROW)) 
  { 
  mario.spt.velocityX = 20;
  mario.spt.changeAnimation("marioe",marioRight);
  }

  if (keyWentUp(RIGHT_ARROW)) 
  { 
  mario.spt.velocityX = 0;
  mario.spt.changeAnimation("mario",marioR);
  }

  if(keyDown("b") && bulletCount === 0){
  bullet = createSprite(mario.spt.x,mario.spt.y)
  bullet.addImage("bullet",bulletIMG);
  bullet.velocityX = 25;
  bullet.scale = 0.05;
  bullet.lifetime = displayWidth/5;
  bulletCount++;
  bulletGroup.add(bullet);
  bulletSound.play();
  } 

  if(mousePressedOver(modi)) {
    score++;
  }
  
  

  if(keyWentUp("b")){
  bulletCount = 0;
  }

  if(keyDown("v") && bulletCount === 0){
    bullet = createSprite(mario.spt.x,mario.spt.y)
    bullet.addImage("bullet",bulletIMG);
    bullet.velocityX = -25;
    bullet.scale = 0.05;
    bullet.lifetime = displayWidth/5;
    bulletCount++;
    bulletGroup.add(bullet);
    bulletSound.play();
    }
  
    if(keyWentUp("v")){
    bulletCount = 0;
    }

  spawnOb2();
  spawnCoin();
  
  mario.spt.velocityY = mario.spt.velocityY + 0.4;

  if (keyDown("space")) 
  {
  mario.spt.velocityY = -30;
  if(spaceCount===0)
  jumpSound.play();
  spaceCount++;
  } }


  if(keyWentUp("space")) {
  spaceCount=0;
  }

  if(gameState==LOSE)
  {  
  stroke("red");
  fill("red");
  textSize(40);
  text("GAME OVER",mario.spt.x,200);
  obstacleGroup.setVelocityXEach(0);
  for(var i = 0; i<obstacleGroup.length; i++){
  if(obstacleGroup.get(i)!==null && mario.spt.isTouching(obstacleGroup)){
  obstacleGroup.get(i).changeAnimation("Collide",obstacleCollide);
  } }
   
  ob2Group.setVelocityXEach(0);
  mario.spt.setVelocity(0,0);
  mario.spt.pause();
  blast.x = mario.spt.x+130;
  blast.y = 300;
  blast.visible = true;
  mario.spt.changeAnimation("marioh",marioDie);
  
  }

  if(gameState==WIN)
  {  
  stroke("green");
  fill("orange");
  textSize(40);
  text("Winner",mario.spt.x-180,150);
  text("Go to palace!",mario.spt.x-150,200);
  obstacleGroup.destroyEach();
  man4.visible = true;
  
  }

  if(ob2Group.isTouching(mario.spt)){
  gameState=LOSE;
  mario.spt.shapeColor = "red";
  }
  fill("black")
  text("Time : "+time, mario.spt.x+400,60);
  text("Score :"+ score ,mario.spt.x-500,60);
   
  drawSprites();
  } 



  function spawnOb2(){
  if (frameCount % 200 == 0){
  var ob2 = createSprite(mario.spt.x+600,random(50,520),50,50);
  ob2.velocityX = -5;
  ob2.addImage(ob2IMG);          
  ob2.scale = 0.2;
  ob2.lifetime = 500;
  ob2Group.add(ob2);
  } }
 
  function spawnCoin(){
  if (frameCount % 100 == 0){
  var coin = createSprite(mario.spt.x+600,random(50,520),10,10);
  coin.addImage(coin1IMG); 
  coin.scale = 0.2;
  coin.lifetime = 500;
  coinGroup.add(coin);
  } }