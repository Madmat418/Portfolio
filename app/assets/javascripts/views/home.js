Portfolio.Views.Home = Backbone.View.extend( {
  template: JST['home'],
  
  render: function() {
    var content = this.template;
	this.$el.html(content);
	return this;
  }
});