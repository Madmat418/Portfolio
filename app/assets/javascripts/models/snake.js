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
	console.log(head)
	console.log(snake.DIFFS[snake.dir]);
	var new_head = head.plus(snake.DIFFS[snake.dir]);
	console.log(new_head);
	if (snake.eatsApple(new_head)) {
	  snake.segments.push(head.plus(snake.DIFFS[snake.dir]));
	  snake.board.apple.replace();
	} else if (snake.board.validMove(new_head)) {
	  snake.segments.push(head.plus(snake.DIFFS[snake.dir]));
	  snake.segments.shift();
	} else {
	  snake.segments = "Game Over";
	};
  },
  
  eatsApple: function(coord) {
    return false;
  
/*     var apple_coord = this.board.apple.position
	return (coord.i == apple_coord.i) && (coord.j == apple_coord.j); */
  },
  
  turn: function (newDir) {
    if (newDir.i + this.dir.i !== 0 || newDir.j + this.dir.j) {
	  this.dir = newDir;
	};
  }
})