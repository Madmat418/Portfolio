Portfolio.Models.Asteroid = Backbone.Model.extend({
  initialize: function(game) {
    this.positionAndVelocity(game);
    this.radius = (Math.random() * 30) + 10;
	this.determineColor();
  },
  
  positionAndVelocity: function(game) {
    var side = Math.random();
  	if (side <= 0.25) {
  		this.pos = [Math.random() * game.dimX, 0];
  		this.vel = [Math.random() * 10 - 5, Math.random() * 10];
  	} else if (side <= 0.50) {
  		this.pos = [Math.random() * game.dimX, game.dimY];
  		this.vel = [Math.random() * 10, Math.random() *(-10)];
  	} else if (side <= 0.75) {
  		this.pos = [0, Math.random() * game.dimX];
  		this.vel = [Math.random() * 10, Math.random() * 10 - 5];
  	} else {
  		this.pos = [game.dimX, Math.random() * game.dimY];
  		this.vel = [Math.random() * (-10), Math.random() * 10 - 5];
  	}
  },
  
  determineColor: function() {
    if (this.radius >= 30) {
	  this.color = "black";
	} else if (this.radius >= 20) {
	  this.color = "gray";
	} else {
	  this.color = "red";
	}
  },
  
  move: function() {
    this.pos[0] = this.pos[0] + this.vel[0];
	this.pos[1] = this.pos[1] + this.vel[1];
  },
  
  draw: function(ctx) {
    ctx.fillStyle = this.color;
	ctx.beginPath();
    ctx.arc(
      this.pos[0],
	  this.pos[1],
	  this.radius,
	  0,
	  2 * Math.PI,
	  false
	);

	ctx.fill();
  },
  
  isCollidedWith: function(otherObject) {
    var a = this.pos[0] - otherObject.pos[0];
	var b = this.pos[1] - otherObject.pos[1];
	var distance = Math.pow((Math.pow(a, 2) + Math.pow(b, 2)), 0.5);
	var radii = this.radius + otherObject.radius;
	return distance < radii;
  }
 })