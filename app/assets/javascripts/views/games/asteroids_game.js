Portfolio.Views.AsteroidsGame = Backbone.View.extend ({
  template: JST['games/space'],
  
  initialize: function() {
    console.log(this.template);
    this.dimX = 800;
	this.dimY = 600;
	this.level = 1;
	
	console.log('before asteroids');
	this.asteroids = [];
	this.addAsteroids(this.level * 5, this);
	console.log('after asteroids');
	
  },
  
  render: function() {
    var content = this.template;
	this.$el.html(content);
	console.log(this.template);
    var canvas = this.$('#canvas')[0];
	this.ctx = canvas.getContext('2d');
	this.start();

	return this;
  },
  
  events: {
    'keydown': 'keyAction'
  },
  
  addAsteroids: function(num) {
    for (var i = 0; i < num; i++) {
	  this.asteroids.push(new Portfolio.Models.Asteroid(this));
	}
  },
  
  keyAction: function(e) {
    var code = e.keyCode
	if (code === 32) {
	  this.ship.fireBullet();
	} else {
	  this.ship.impulse(code)
	}	
  },
  
  inBounds: function(asteroid) {
    var game = this;
    if (asteroid.pos[0] > (0 - asteroid.radius) && 
  			  asteroid.pos[0] < (game.dimX + asteroid.radius) &&
  			  asteroid.pos[1] > (0 - asteroid.radius) &&
  			  asteroid.pos[1] < (game.dimY + asteroid.radius)) {
	  return true
	} else {
	  return false
	}
  },
  
  checkInBounds: function(object) {
    var game = this;
	var oldAsteroids = this.asteroids;
	game.asteroids = [];

  	oldAsteroids.forEach(function (asteroid) {
  	  if (game.inBounds(asteroid)) {
	    console.log('in');
	    game.asteroids.push(asteroid);
  	  } else {
	    console.log('out');
	    game.addAsteroids(1);
	    
	  }
  	})
  },
  
  checkCollisions: function(object) {
    var game = this;
  	var collision = false;
  	game.asteroids.forEach(function (asteroid) {
  		if (asteroid.isCollidedWith(object)) {
  			collision = true;
  			game.removeAsteroid(asteroid);
  		}
  	})
  	return collision
  },
  
  draw: function() {
    var game = this;
  	game.ctx.clearRect(0, 0, game.dimX, game.dimY);
    this.asteroids.forEach(function(element) {element.draw(game.ctx)});
  },
  
  move: function() {
    var game = this;
  	this.asteroids.forEach(function(element) {element.move()});
  },
  
  step: function() {
    console.log('stepping');
    this.move();
  	this.checkInBounds();
  	this.draw();
  },
  
  start: function() {
    console.log('started');
    var game = this;
  	game.timer = setInterval(game.step.bind(game), 30);
  }
  
  
})