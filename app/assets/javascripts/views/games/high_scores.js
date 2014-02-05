Portfolio.Views.HighScores = Backbone.View.extend({
  template: JST['high_scores'],
  render: function () {
    var that = this;
    console.log('rendering');
    var collection = new Portfolio.Collections.SnakeScores
	collection.fetch({success: function() {
	  console.log(collection);
	  var high_scores = collection.models;
	  console.log(high_scores);
	  var content = that.template({collection: high_scores})
	  that.$el.html(content);
	}});
	return that;
  }
})