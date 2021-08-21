  class Wall {
  constructor(posX) {
     
  this.rx = posX;
  this.ry = height-random([550,350]);
  this.spt=createSprite(this.rx, this.ry);
  this.spt.shapeColor="black";
  this.spt.addAnimation("ground",wallAnimation);
  this.spt.scale=0.5;
  } }