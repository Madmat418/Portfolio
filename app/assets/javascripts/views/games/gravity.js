Portfolio.Views.Gravity = Backbone.View.extend ({
  template: JST['games/gravity'],
  
  start: function() {

    this.dimX = this.canvas.width;
    this.dimY = this.canvas.height;
    this.container = this.canvas.parentNode;
    this.context = this.canvas.getContext('2d');
    this.solarSystem = new Portfolio.Models.SolarSystem({ctx: this.context, canvas: this.canvas});
    this.tempCanvas = document.createElement('canvas');
    this.tempCanvas.id = 'imageTemp';
    this.tempCanvas.width = this.canvas.width;
    this.tempCanvas.height = this.canvas.height;
    this.container.appendChild(this.tempCanvas);
    this.tempContext = this.tempCanvas.getContext('2d');
    this.started = false;
    this.dragging = false;
    this.tracing = true;
  },
  
  events: {
    'click #reset': 'reset',
    'mousedown #imageTemp': 'onMouseDown',
    'mouseup #imageTemp': 'onMouseUp',
    'mousemove #imageTemp': 'onMouseMove',
    'click #trace-reset': 'resetTrace',
    'click #trace-toggle': 'toggleTrace'
  },
  
  resetTrace: function() {
    var traces = $('.tracedImages');
    traces.each(function(index, trace) {
	  trace.remove();
	})
	this.solarSystem.moons.forEach(function(moon) {
	  moon.newTrace();
	})
  },
  
  toggleTrace: function() {
    var that = this;
	that.tracing = !that.tracing;
    that.solarSystem.moons.forEach(function(moon) {
	  if (!moon.tracing) {
	    moon.newTrace();
	  }
	  moon.tracing = that.tracing;
	});
  },
  
  reset: function() {
    this.solarSystem.moons.forEach(function(moon) {
	  moon.tracer.remove();
      moon.destroy();
    });
	clearInterval(this.solarSystem.interval);
    this.solarSystem.destroy();
    this.render();
  },
  
  render: function() {
    var content = this.template;
	this.$el.html(content);
	this.canvas = this.$('#imageView')[0];
	this.start();
	return this;
  },
  
  getXY: function(ev) {
    if (ev.layerX || ev.layerX == 0) {
	  ev._x = ev.layerX;
	  ev._y = ev.layerY;
	} else if (ev.offsetX || ev.offsetX == 0) {
	  ev._x = ev.offsetX;
	  ev._y = ev.offsetY;
	}
  },
  
  within: function(obj, pos) {
    var distance = Math.sqrt(Math.pow(obj.pos[0] - pos[0], 2) + Math.pow(obj.pos[1] - pos[1], 2));
	console.log(distance);
	return distance <= obj.radius
  },
  
  onMouseDown: function(ev) {
    this.getXY(ev);
    if (this.within(this.solarSystem.moons[0],[ev._x,ev._y])) {
	  this.dragging = true
	} else {
      this.started = true;
      this.x0 = ev._x;
      this.y0 = ev._y;
	}
  },
  
  onMouseMove: function(ev) {
    this.getXY(ev);
	if (this.dragging) {
	  this.solarSystem.moons[0].pos = [ev._x, ev._y]
	} else if (!this.started) {
      return;
    } else {
	  this.tempContext.clearRect(0, 0, this.dimX, this.dimY);
	  this.tempContext.beginPath();
	  this.tempContext.moveTo(this.x0, this.y0);
	  this.tempContext.lineTo(ev._x, ev._y);
	  this.tempContext.stroke();
	  this.tempContext.closePath();
	  this.x1 = ev._x;
	  this.y1 = ev._y;
	}
  },
  
  onMouseUp: function(ev) {
    this.getXY(ev);
	if (this.dragging) {
	  this.onMouseMove(ev);
	  this.dragging = false;
	} else if (this.started) {
      this.onMouseMove(ev);
	  this.started = false;
	  var moon = this.solarSystem.moons[0];
	  console.log(this.tracing);
	  this.solarSystem.moons.unshift(new Portfolio.Models.Moon({planet: this.solarSystem.planet, canvas: this.canvas, tracing: this.tracing}));
	  moon.movable = true;
	  moon.vel = [(this.x0 - this.x1) / 30, (this.y0 - this.y1) / 30]
	  this.tempContext.clearRect(0, 0, this.dimX, this.dimY);
	}
  }  
})