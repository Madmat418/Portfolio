(function (root) {
  SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  
  var Snake = SnakeGame.Snake = function (board) {
    this.dir = "N";
	this.board = board;
	
	var center = new Coord(10, 10);
	this.segments = [center];
  };
  
  var Coord = SnakeGame.Coord = function (i, j) {
    this.i = i;
	this.j = j;
  };
  
  Coord.prototype.plus = function (coord2) {
    return new Coord(this.i + coord2.i, this.j + coord2.j)
  };  
  
  Snake.DIFFS = {
    "N" : new Coord(-1,0),
	"E": new Coord(0, 1),
	"S": new Coord(1, 0),
	"W": new Coord(0, -1)
  };
  

  
  Snake.SYMBOL = "S";
  
  Snake.prototype.move = function () {
    var snake = this;
	var head = _(this.segments).last();
	var new_head = head.plus(Snake.DIFFS[this.dir]);
	
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
  
  Snake.prototype.eatsApple = function(coord) {
    return false;
  
/*     var apple_coord = this.board.apple.position
	return (coord.i == apple_coord.i) && (coord.j == apple_coord.j); */
  };
  
  Snake.prototype.turn = function (newDir) {
    if (newDir.i + this.dir !== 0) {
	  this.dir = newDir;
	};
  };
  
  var Board = SnakeGame.Board = function (dim) {
    this.dim = dim;
  
    this.snake = new Snake(this);
  };
  
  Board.prototype.validMove = function (newPos) {
    var max = this.dim
	var onBoard = function (num) {
	  return num >= 0 && num < max
	}
	
	if (onBoard(newPos.i) && onBoard(newPos.j)) {
	  return true
	} else {
	  return false
	}
  };
  
  Board.Blank_SYMBOL = ".";
  
  Board.blankGrid = function (dim) {
    return _.times(dim, function () {
	  return _.times(dim, function () {
	    return Board.BLANK_SYMBOL;
	  });
	});
  };
  
  Board.prototype.render = function () {
    var grid = Board.blankGrid(this.dim);
	
	_(this.snake.segments).each(function (seg) {
	  grid[seg.i][seg.j] = Snake.SYMBOL;
	});
	
	return _(grid).map(function (row) { return row.join(""); }).join("\n");
  };
  
  
  
})(this);