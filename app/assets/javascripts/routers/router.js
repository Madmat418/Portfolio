Portfolio.Routers.Router = Backbone.Router.extend ({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
  },
  
  routes: {
    '':'home',
	'snakes': 'snake'
  },
  
  home: function () {
    var view = new Portfolio.Views.Home;
	this._swapView(view);
  },
  
  snake: function () {
    var view = new Portfolio.Views.Snake;
	console.log('snake router');
	this._swapView(view);
  },
  
  _swapView: function (view) {
    console.log('swapping view');
    this._currentView && this._currentView.remove();
	this._currentView = view;
	this.$rootEl.html(view.render().$el);
  }
  
});