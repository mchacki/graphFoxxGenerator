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
      this.createNew = new app.CreateNewView();
    },
    
		routes: {
      "edit/:name": "displayEdit", 
      "": "displayLoad"
		},

    displayEdit: function (name) {
      this.menu.render(name);
      switch (name) {
        case "new":
          this.createNew.render();
          break;
        case "meta":
          this.changeMeta.render();
          break;
        default:
          this.changeAction.render(name);
          break;
      }
    },

    displayLoad: function () {
      this.menu.render("new");
      this.changeMeta.render();
    }
	});
  
  app.loadedApp = "Test";
	app.router = new GeneratorRouter();
	Backbone.history.start();
  
})();
