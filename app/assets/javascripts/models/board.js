Portfolio.Models.Board = Backbone.Model.extend({
  initialize: function (dim) {
    this.dim = dim;
    this.snake = new Portfolio.Models.Snake(this);
  },
  
  validMove: function (newPos) {
    var max = this.dim
	var onBoard = function (num) {
	  return num >= 0 && num < max
	}
	
	if (onBoard(newPos.i) && onBoard(newPos.j)) {
	  return true
	} else {
	  return false
	}
  },
  
  blankGrid: function (dim) {
    return _.times(dim, function () {
	  return _.times(dim, function () {
	    return Board.BLANK_SYMBOL;
	  });
	});
  }
})