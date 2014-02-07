Portfolio.Models.Moon = Backbone.Model.extend({
  initialize: function(options) {
    this.canvas = options.canvas;
    this.tracer = document.createElement('canvas');
	this.container = this.canvas.parentNode
	this.tracer.id = 'imageTrace';
	this.tracer.className = 'tracedImages';
	console.log(this.tracer.className);
    this.tracer.width = this.canvas.width;
	this.tracer.height = this.canvas.height;
	this.container.appendChild(this.tracer);
	this.ctx = this.tracer.getContext('2d');
    this.pos = [this.canvas.width / 4, this.canvas.height / 2]
	this.vel = [0, 0]
	this.color = 'red';
	this.radius = 10;
	this.planet = options.planet;
	this.movable = false;
	this.started = false;
	this.tracing = options.tracing;
  },
  
  newTrace: function() {
    this.tracer = document.createElement('canvas');
	this.tracer.id = 'imageTrace';
    this.tracer.width = this.canvas.width;
	this.tracer.height = this.canvas.height;
	this.container.appendChild(this.tracer);
    this.ctx = this.tracer.getContext('2d');
    this.tracer.className = 'tracedImages';
  },
  
  accelerate: function() {
    var x_vector = this.planet.pos[0] - this.pos[0];
	var y_vector = this.planet.pos[1] - this.pos[1];
	var distance = (Math.sqrt((Math.pow(x_vector, 2) + Math.pow(y_vector, 2))));
	var normal_vector = [(x_vector / distance),(y_vector / distance)]
	var force = 100 * ((this.planet.mass) / (Math.pow(distance,2)));
    this.vel[0] += force * normal_vector[0];
	this.vel[1] += force * normal_vector[1];
  },
  
  move: function() {
    this.pos[0] += this.vel[0];
	this.pos[1] += this.vel[1];
  },
  
  trace: function() {
    if (!this.started) {
      this.ctx.beginPath();
	  this.ctx.moveTo(this.pos[0], this.pos[1]);
	  this.started = true;		  
	} else {
	  this.ctx.lineTo(this.pos[0], this.pos[1]);
	  this.ctx.stroke();
	}
	
	console.log('tracing');

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
	ctx
  }
  
  
})