Portfolio.Models.Planet = Backbone.Model.extend({
  initialize: function(canvas) {
    this.pos = [(canvas.width / 2), (canvas.height / 2)]

    this.radius = 20;
    this.color = "blue";
	this.mass = 40;
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
  }
})