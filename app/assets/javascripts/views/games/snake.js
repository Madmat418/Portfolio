Portfolio.Views.Snake = Backbone.View.extend ({
  template: JST['games/snake'],
  
  initialize: function () {
    alert("I am currently experiencing some conflicts with Internet Explorer.  For optimal experience, run in Google Chrome.");
	this.board = new Portfolio.Models.Board(20, this);
	this.scores = new Portfolio.Collections.SnakeScores();
	this.counter = 0;
	this.KEYS = {
      38: "N",
	  39: "E",
	  40: "S",
	  37: "W"
    };
  
	$(window).keydown(this.handleKeyEvent.bind(this));
  },
  
  newGame: function() {
    this.counter = -10;
	this.board = new Portfolio.Models.Board(20, this);
	this.intervalId = window.setInterval(
	  this.step.bind(this),
	  100
	);
  },
  
  events: {
    'click #submit' : 'highScore',
	'click #new-game' : 'newGame',
	'click #high-scores' : 'showScores',
	'click #hide-scores' : 'hideScore',
	'click #hide-scorer' : 'hideScorer'
  },
  
  hideScore: function() {
    $('#high-score-modal').hide();
  },
  
  hideScorer: function() {
    $('#score-modal').hide();
  },
  
  showScores: function() {
    var list = this.$('#high-scores')
	var content = new Portfolio.Views.HighScores({model: list})
	list.html(content.render().$el);
	this.$('#high-score-modal').show();
  },
  
  highScore: function(event) {
    event.preventDefault;
	var data = this.$('#score').serializeJSON();
	var score = new Portfolio.Models.SnakeScore(data);
	score.save();
	this.$('#score-modal').hide();
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
	  $('#score-modal').show();
	} else {
	  this.render();
	}
  },
  
  render: function () {
    var view = this;
	this.scores.fetch();
	var content = this.template({counter: this.counter, scores: this.scores});
	this.$el.html(content); 
	var board = view.board;
	this.$('#score-modal').hide();
	this.$('#high-score-modal').hide();
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
	
	this.$('#grid').empty();
	_(cellsMatrix).each(function (row) {
	  var $rowEl = $('<div class="row"></div>');
	  _(row).each(function ($cell) { $rowEl.append($cell) });
	  this.$('#grid').append($rowEl);
	});
	
	return view
  }
});