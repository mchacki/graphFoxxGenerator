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
			this.loadApp = new app.LoadAppView();
      this.changeNodes = new app.ChangeNodeOpticView();
      this.changeEdges = new app.ChangeEdgeOpticView();
      this.changeLayout = new app.ChangeLayoutOpticView();
    },
    
		routes: {
      "optic/:name": "displayOptic",
      "action/:name": "displayAction",
      "edit/:name": "displayEdit", 
      "": "displayLoad"
		},

    displayAction: function (name) {
			if (!app.loadedApp && name !== "new" && name !== "load") {
				app.router.navigate("edit/load", {trigger: true});
			} else {
        this.menu.render(name);
        this.changeAction.render(name);
      }
    },
    
    displayOptic: function (name) {
			if (!app.loadedApp && name !== "new" && name !== "load") {
				app.router.navigate("edit/load", {trigger: true});
			} else {
        this.menu.render(name);
	      switch (name) {
	        case "nodes":
	          this.changeNodes.render();
	          break;
					case "edges":
						this.changeEdges.render();
						break;
	        case "layout":
	          this.changeLayout.render();
	          break;
	        default:
	          this.loadApp.render();
	      }
      }
    },

    displayEdit: function (name) {
			if (!app.loadedApp && name !== "new" && name !== "load") {
				app.router.navigate("edit/load", {trigger: true});
			} else {
	      this.menu.render(name);
	      switch (name) {
	        case "new":
	          this.createNew.render();
	          break;
					case "load":
						this.loadApp.render();
						break;
	        case "meta":
	          this.changeMeta.render();
	          break;
	        default:
	          this.loadApp.render();
	      }
			}
      
    },

    displayLoad: function () {
      this.menu.render("new");
      this.changeMeta.render();
    }
	});
  
	app.router = new GeneratorRouter();
	Backbone.history.start();
  
})();
