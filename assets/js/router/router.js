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
      this.changeMeta = new app.ChangeMetaView();
    },
    
		routes: {
      "edit/:name": "displayEdit", 
      "": "displayLoad"
		},

    displayEdit: function (name) {
      this.menu.render(name);
      if (name !== "meta") {
        this.changeAction.render(name, "own");
      } else if (name === "meta") {
        this.changeMeta.render();
      }
    },

    displayLoad: function () {
      this.menu.render("meta");
      this.changeMeta.render();
    }
	});
  
  app.loadedApp = "Test";
	app.router = new GeneratorRouter();
	Backbone.history.start();
  
})();
