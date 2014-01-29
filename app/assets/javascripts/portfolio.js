window.Portfolio = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function () {
    var $rootEl = $('#main');
	var $navbarEl = $('#navbar');
	var navbar = new Portfolio.Views.Navbar();
	$navbarEl.html(navbar.render().$el);
	new Portfolio.Routers.Router($rootEl);
	Backbone.history.start();
  }
};

$(Portfolio.initialize);
  