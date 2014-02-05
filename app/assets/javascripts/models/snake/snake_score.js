Portfolio.Models.SnakeScore = Backbone.Model.extend({
  initialize: function(options) {
    this.name = options.name;
	this.score = options.score;
  },
  urlRoot: 'snake_scores/'
})