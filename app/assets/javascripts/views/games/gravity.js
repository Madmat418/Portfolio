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
	$('#imageTemp').bind('mousedown', {thisView : this}, this.onMouseDown);
	$('#imageTemp').bind('mousemove', {thisView : this}, this.onMouseMove);
	$('#imageTemp').bind('mouseup', {thisView : this}, this.onMouseUp);
  },
  
  events: {
    'mousedown #imageTemp': 'onMouseDown',
	'mouseup #imageTemp': 'onMouseUp',
	'mousemove #imageTemp': 'onMouseMove'
  },
  
  test: function(event) {
    console.log(event);
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
  
  onMouseDown: function(ev) {
    this.getXY(ev);
    this.started = true;
    this.x0 = ev._x;
    this.y0 = ev._y;
  },
  
  onMouseMove: function(ev) {
    this.getXY(ev);
    if (!this.started) {
      return;
    }
	this.tempContext.clearRect(0, 0, this.dimX, this.dimY);
	this.tempContext.beginPath();
	this.tempContext.moveTo(this.x0, this.y0);
	this.tempContext.lineTo(ev._x, ev._y);
	this.tempContext.stroke();
	this.tempContext.closePath();
	this.x1 = ev._x;
	this.y1 = ev._y;
  },
  
  onMouseUp: function(ev) {
    this.getXY(ev);
    if (this.started) {
      this.onMouseMove(ev);
	  this.started = false;
	  var moon = this.solarSystem.moons[0];
	  this.solarSystem.moons.unshift(new Portfolio.Models.Moon({planet: moon.planet, pos: [this.dimX / 4, this.dimY / 2], vel: [0, 0], radius: 10, color: 'red', canvas: moon.canvas}));
	  moon.movable = true;
	  moon.vel = [(this.x0 - this.x1) / 30, (this.y0 - this.y1) / 30]
	  this.tempContext.clearRect(0, 0, this.dimX, this.dimY);
	}
  }  
})