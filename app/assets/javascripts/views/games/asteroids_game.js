Portfolio.Views.AsteroidsGame = Backbone.View.extend ({
  template: JST['games/space'],
  
  initialize: function() {
    alert("I am currently experiencing some conflicts with Internet Explorer.  For optimal experience, run in Google Chrome.");
    this.dimX = 800;
	this.dimY = 600;
	this.level = 1;
	this.ship = new Portfolio.Models.Ship(this);
	this.bullets = [];
	this.asteroids = [];
	this.addAsteroids(this.level * 5);
	$(window).keydown(this.keyAction.bind(this));
	console.log('after asteroids');
	
  },
  
  removeAsteroid: function(object) {
    var that = this;
    var oldArray = this.asteroids;
	this.asteroids = [];
	console.log('removing');
	
	oldArray.forEach( function (asteroid) {
	  if (asteroid !== object) {
	    that.asteroids.push(asteroid);
	  }
	})
  },
  
  removeBullet: function(object) {
    var that = this;
    var oldArray = this.bullets;
	this.bullets = [];
	
	oldArray.forEach( function (bullet) {
	  if (bullet !== object) {
	    that.bullets.push(bullet);
	  }
	})
  },
  
  render: function() {
    var content = this.template;
	this.$el.html(content);
    var canvas = this.$('#canvas')[0];
	this.ctx = canvas.getContext('2d');
	this.start();

	return this;
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
	    game.asteroids.push(asteroid);
  	  } else {
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
	this.bullets.forEach(function(element) {element.draw(game.ctx)})
	this.ship.draw(game.ctx);
  },
  
  move: function() {
    var game = this;
  	this.asteroids.forEach(function(element) {element.move()});
	this.bullets.forEach(function(element) {element.move()});
	this.ship.move();
  },
  
  step: function() {
    var that = this;
    this.move();
  	this.checkInBounds();
	this.bullets.forEach( function(bullet) {
	  if (that.checkCollisions(bullet)) {
	    that.removeBullet(bullet);
	  }
	})
	if (this.asteroids.length === 0) {
	  that.level += 1
	  that.addAsteroids(that.level * 5);
	}
  	this.draw();
  },
  
  start: function() {
    var game = this;
  	game.timer = setInterval(game.step.bind(game), 30);
  }
  
  
})