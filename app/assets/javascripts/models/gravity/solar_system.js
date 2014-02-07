Portfolio.Models.SolarSystem = Backbone.Model.extend({
  initialize: function(options) {
    var system = this;
    this.canvas = options.canvas;
	this.ctx = options.ctx;
	this.planet = new Portfolio.Models.Planet(this.canvas);
	this.moons = [new Portfolio.Models.Moon({planet: this.planet, canvas: this.canvas, tracing: true})];
	setInterval(function() {system.step(system.ctx)}, 20)
  },
  
  step: function(ctx) {
    var that = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.planet.draw(ctx);
    this.moons.forEach(function(moon) {
	  if (moon.movable) {
	    moon.accelerate();
	    moon.move();
	    if (moon.tracing) {
		  that.counter = 0
	      moon.trace();
	    }
	  }
	  moon.draw(ctx);
	})
  }
});