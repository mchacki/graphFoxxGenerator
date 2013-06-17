/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Router
	// ----------
	var GeneratorRouter = Backbone.Router.extend({
    initialize: function() {
      this.menu = new app.MenuView();
    },
    
		routes: {
      "": "displayLoad"
		},

    displayLoad: function () {
      this.menu.render("meta");
    }
	});

	app.router = new GeneratorRouter();
	Backbone.history.start();
})();
