Portfolio.Routers.Router = Backbone.Router.extend ({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
  },
  
  routes: {
    '':'home',
	'snakes': 'snake',
	'about': 'about',
	'contact': 'contact',
	'asteroids': 'asteroids',
	'resume': 'resume',
	'projects': 'projects',
	'gravity': 'gravity'
	
  },
  
  home: function () {
    var view = new Portfolio.Views.Home;
	this._swapView(view);
  },
  
  gravity: function () {
    console.log('gravity');
    var view = new Portfolio.Views.Gravity;
	this._swapView(view);
  },
  
  resume: function () {
    var view = new Portfolio.Views.Resume;
	this._swapView(view);
  },
  
  projects: function() {
    var view = new Portfolio.Views.Projects;
	this._swapView(view);
  },
  
  snake: function () {
    var view = new Portfolio.Views.Snake;
	this._swapView(view);
  },
  
  asteroids: function () {
    var view = new Portfolio.Views.AsteroidsGame;
	this._swapView(view);
  },
  
  about: function () {
    var view = new Portfolio.Views.About;
	this._swapView(view);
  },
  
  contact: function() {
    var view = new Portfolio.Views.Contact;
	this._swapView(view);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
	this._currentView = view;
	this.$rootEl.html(view.render().$el);
  }
  
});