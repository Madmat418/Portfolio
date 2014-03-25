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
	'gravity': 'gravity',
	'chatRoom': 'chatRoom'	
  },
  
  home: function () {
    this._makeActive('#home');
    var view = new Portfolio.Views.Home;
	this._swapView(view);
  },
  
  gravity: function () {
    this._makeActive('#games');
    var view = new Portfolio.Views.Gravity;
	this._swapView(view);
  },
  
  resume: function () {
    this._makeActive('#resume');
    var view = new Portfolio.Views.Resume;
	this._swapView(view);
  },
  
  projects: function() {
    this._makeActive('#projects');
    var view = new Portfolio.Views.Projects;
	this._swapView(view);
  },
  
  snake: function () {
    this._makeActive('#games');
    var view = new Portfolio.Views.Snake;
	this._swapView(view);
  },
  
  asteroids: function () {
    this._makeActive('#games');
    var view = new Portfolio.Views.AsteroidsGame;
	this._swapView(view);
  },
  
  about: function () {
    this._makeActive('#about');
    var view = new Portfolio.Views.About;
	this._swapView(view);
  },
  
  contact: function() {
    this._makeActive('#contact');
    var view = new Portfolio.Views.Contact;
	this._swapView(view);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
	this._currentView = view;
	this.$rootEl.html(view.render().$el);
  },
  
  _makeActive: function(button) {
    $('.nav-button').removeClass('active');
    $(button).addClass('active');
  }
  
});