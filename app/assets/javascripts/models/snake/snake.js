Portfolio.Models.Snake = Backbone.Model.extend({
  initialize: function (board) {
    this.dir = "N";
	this.board = board;
	
	var center = new Portfolio.Models.Coord([10, 10]);
	this.segments = [center];
  },
  
  
  
  DIFFS: {
    "N" : new Portfolio.Models.Coord([-1,0]),
	"E": new Portfolio.Models.Coord([0,1]),
	"S": new Portfolio.Models.Coord([1,0]),
	"W": new Portfolio.Models.Coord([0,-1])
  },
  
  move: function () {
    var snake = this;
	var head = _(snake.segments).last();
	var new_head = head.plus(snake.DIFFS[snake.dir]);
	if (snake.eatsApple(new_head)) {
	  snake.segments.push(head.plus(snake.DIFFS[snake.dir]));
	  snake.board.replaceApple();
	} else if (snake.board.validMove(new_head)) {
	  snake.segments.push(head.plus(snake.DIFFS[snake.dir]));
	  snake.segments.shift();
	} else {
	  snake.segments = "Game Over";
	};
  },
  
  eatsApple: function(coord) {
    var apple_coord = [this.board.apple.i, this.board.apple.j];
	return (coord.i == apple_coord[0]) && (coord.j == apple_coord[1])
  },
  
  turn: function (newDir) {
    if (this.DIFFS[newDir].i + this.DIFFS[this.dir].i !== 0 || this.DIFFS[newDir].j + this.DIFFS[this.dir].j !== 0) {
	  this.dir = newDir;
	};
  }
})