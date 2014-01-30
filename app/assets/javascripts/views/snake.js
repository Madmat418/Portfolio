Portfolio.Views.Snake = Backbone.View.extend ({
  template: JST['snake'],
  
  initialize: function () {
    console.log(this.template);
    this.board = new Portfolio.Models.Board(20);
	this.KEYS = {
      38: "N",
	  39: "E",
	  40: "S",
	  37: "W"
  };
	$(window).keydown(this.handleKeyEvent.bind(this));
	this.intervalId = window.setInterval(
	  this.step.bind(this),
	  200
	);
  },
  
  handleKeyEvent: function(event) {
    if (_(this.KEYS).has(event.keyCode)) {
	  this.board.snake.turn(this.KEYS[event.keyCode]);
	} else {
	  // ignore other key presses
	}
  },
  
  step:  function () {
    this.board.snake.move();
	if (this.board.snake.segments === "Game Over") {
	  clearInterval(this.intervalId);
	  alert('game over');
	} else {
	  this.render();
	}
  },
  
  render: function () {
    var view = this;
	var content = this.template
	this.$el.html(content); 
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
	
	cellsMatrix[board.apple.i][board.apple.j].addClass('apple');
	
	this.$el.empty();
	_(cellsMatrix).each(function (row) {
	  var $rowEl = $('<div class="row"></div>');
	  _(row).each(function ($cell) { $rowEl.append($cell) });
	  view.$el.append($rowEl);
	});
	
	return view
  }
});