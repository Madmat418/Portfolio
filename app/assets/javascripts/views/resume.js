Portfolio.Views.Resume = Backbone.View.extend ({
  template: JST['resume_template'],
  
  render: function() {
    console.log('resume');
	console.log(this.template);
    var content = this.template;
	this.$el.html(content);
	return this;
  }
})