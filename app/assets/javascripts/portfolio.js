window.Portfolio = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function () {
    var $rootEl = $('#main');
	new Portfolio.Routers.Router($rootEl);
	Backbone.history.start();
  }
};

$(Portfolio.initialize);
  