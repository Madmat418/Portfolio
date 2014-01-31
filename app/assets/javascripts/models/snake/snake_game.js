Portfolio.Models.SnakeGame = Backbone.Model.extend ({
  
  initialize: function() {
    console.log('here');
	this.board = new Portfolio.Models.Board(20);
	this.$el = $('#grid');
	$(window).keydown(this.handleKeyEvent.bind(this));
	this.intervalId = window.setInterval(
	  this.step.bind(this),
	  this.STEP_MILLIS
	);
  },
  
  STEP_MILLIS: 200,
  
  handleKeyEvent: function (event) {
    if (_(this.KEYS).has(event.keyCode)) {
	  this.board.snake.turn(this.KEYS[event.keyCode]);
	} else {
	  // ignore other key presses
	}
  },
  
  render: function () {
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
	return this;
  },
  
  KEYS: {
    38: "N",
	39: "E",
	40: "S",
	37: "W"
  },
  
  step: function () {
  	this.board.snake.move();
	if (this.board.snake.segments === "Game Over") {
	  console.log('game over')
	  clearInterval(this.intervalId);
	} else {
	  this.render();
	}
  }
});