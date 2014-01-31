Portfolio.Models.Bullet = Backbone.Model.extend ({
  initialize: function(ship) {
    this.ship = ship;
	this.pos = [];
	this.pos[0] = ship.pos[0];
	this.pos[1] = ship.pos[1];
	this.vel = [0,0];
	this.determineVelocity();
	this.color = 'yellow';
	this.radius = 3;
  },
  
  determineVelocity: function() {
    var shipSpeed = Math.sqrt((Math.pow(this.ship.vel[0],2)) + (Math.pow(this.ship.vel[1],2)));
	this.vel[0] = (this.ship.vel[0] / shipSpeed) * 10
	this.vel[1] = (this.ship.vel[1] / shipSpeed) * 10
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
});