(function (root) {
  SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  
  View = SnakeGame.View = function (el) {
    this.$el = el;
	this.board = null;
	this.intervalId = null;
  };
  
  View.STEP_MILLIS = 200;
  
  View.prototype.handleKeyEvent = function (event) {
    if (_(View.KEYS).has(event.keyCode)) {
	  this.board.snake.turn(View.KEYS[event.keyCode]);
	} else {
	  // ignore other key presses
	}
  };
  
  View.prototype.render = function () {
    var view = this;
	var board = view.board;
	
	function buildCellsMatrix () {
	  return _.times(board.dim, function () {
	    return _.times(board.dim, function () {
		  return $('<div class="cell"></div>');
		});
	  });
	}
	
	var cellsMatrix = buildCellsMatrix();
	_(board.snake.segments).each(function (seg) {
	  cellsMatrix[seg.i][seg.j].addClass('snake');
	});
	
	this.$el.empty();
	_(cellsMatrix).each(function (row) {
	  var $rowEl = $('<div class="row"></div>');
	  _(row).each(function ($cell) { $rowEl.append($cell) });
	  view.$el.append($rowEl);
	});
  };
  
  View.KEYS = {
    38: "N",
	39: "E",
	40: "S",
	37: "W"
  };
  
  View.prototype.start = function() {
    this.board = new SnakeGame.Board(20);
	
	$(window).keydown(this.handleKeyEvent.bind(this));
	this.intervalId = window.setInterval(
	  this.step.bind(this),
	  View.STEP_MILLIS
	);
  };  
  
  View.prototype.step = function () {
  	this.board.snake.move();
	if (this.board.snake.segments === "Game Over") {
	  console.log('game over')
	  clearInterval(this.intervalId);
	} else {
	  this.render();
	}
  };
})(this);
