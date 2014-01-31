Portfolio.Models.Board = Backbone.Model.extend({
  initialize: function (dim) {
    this.dim = dim;
    this.snake = new Portfolio.Models.Snake(this);
	this.apple = this.generateApple();
  },
  
  validMove: function (newPos) {
    var max = this.dim
	var onBoard = function (num) {
	  return num >= 0 && num < max;
	};
	var collision = false
	this.snake.segments.forEach(function(seg) {
	  if (seg.i === newPos.i && seg.j === newPos.j) {
	    collision = true;
	  }
	})
	if ((onBoard(newPos.i) && onBoard(newPos.j)) && !collision) {
	  return true;
	} else {
	  return false;
	}
  },
  
  generateApple: function() {
	var that = this;
    var x = Math.round(Math.random() * 19);
	var y = Math.round(Math.random() * 19);
	var repeated = false;
	this.snake.segments.forEach(function(seg) {
	  if (seg.i === x && seg.j === y) {
	    repeated = true;
	  }
	});
	if (repeated) {
	  return that.generateApple();
	} else {
	  return new Portfolio.Models.Coord([x,y]);
    }
  },
  
  replaceApple: function() {
    this.apple = this.generateApple();
  },
  
  blankGrid: function (dim) {
    return _.times(dim, function () {
	  return _.times(dim, function () {
	    return Board.BLANK_SYMBOL;
	  });
	});
  }
})