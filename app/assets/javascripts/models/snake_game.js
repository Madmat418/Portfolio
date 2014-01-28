Portfolio.Models.Snake = Backbone.Model.extend({
  initialize: function (board) {
    this.dir = "N";
	this.board = board;
	
	var center = new Portfolio.Models.Coord(10, 10);
	this.segments = [center];
  };
  
  
  
  DIFFS: {
    "N" : new Portfolio.Models.Coord(-1,0),
	"E": new Portfolio.Models.Coord(0, 1),
	"S": new Portfolio.Models.Coord(1, 0),
	"W": new Portfolio.Models.Coord(0, -1)
  };
  
  move: function () {
    var snake = this;
	var head = _(this.segments).last();
	var new_head = head.plus(snake.DIFFS[this.dir]);
	
	if (snake.eatsApple(new_head)) {
	  snake.segments.push(head.plus(Snake.DIFFS[this.dir]));
	  this.board.apple.replace();
	} else if (this.board.validMove(new_head)) {
	  snake.segments.push(head.plus(Snake.DIFFS[this.dir]));
	  snake.segments.shift();
	} else {
	  snake.segments = "Game Over";
	};
  };
  
  eatsApple: function(coord) {
    return false;
  
/*     var apple_coord = this.board.apple.position
	return (coord.i == apple_coord.i) && (coord.j == apple_coord.j); */
  };
  
  turn: function (newDir) {
    if (newDir.i + this.dir !== 0) {
	  this.dir = newDir;
	};
  };
})