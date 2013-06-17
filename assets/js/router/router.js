/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Router
	// ----------
	var GeneratorRouter = Backbone.Router.extend({
    initialize: function() {
      this.menu = new app.MenuView();
      this.changeAction = new app.ChangeActionView();
    },
    
		routes: {
      "edit/:name": "displayEdit", 
      "": "displayLoad"
		},

    displayEdit: function (name) {
      this.menu.render(name);
      if (name !== "meta") {
        this.changeAction.render(name, "own");
      }
    },

    displayLoad: function () {
      this.menu.render("meta");
    }
	});

	app.router = new GeneratorRouter();
	Backbone.history.start();
  app.loadedApp = "Test";
})();
