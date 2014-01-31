Portfolio.Models.Ship = Backbone.Model.extend ({
  initialize: function(game) {
    this.game = game;
	this.vel = [0,0];
	this.pos = [( game.dimX / 2), (game.dimY / 2)];
	this.radius = 10;
	this.color = 'blue';
  },
  
  fireBullet: function() {
    if (this.vel[0] !== 0 || this.vel[1] !== 0) {
      this.game.bullets.push(new Portfolio.Models.Bullet(this));
	}
  },
  
  KEYS: {
    38: [0,-1],
	39: [1,0],
	40: [0,1],
	37: [-1,0]
  },
  
  impulse: function(code) {
    if (_(this.KEYS).has(code)) {
      var pulse = this.KEYS[code];
	  this.vel[0] += pulse[0];
	  this.vel[1] += pulse[1];
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