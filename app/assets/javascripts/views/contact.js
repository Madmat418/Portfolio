Portfolio.Views.Contact = Backbone.View.extend({
  template: JST['contact'],
  render: function() {
    var content = this.template;
	this.$el.html(content);
	return this;
  }
})