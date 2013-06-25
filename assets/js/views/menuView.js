var app = app || {};

$(function () {
	'use strict';

	app.MenuView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/menuView.ejs'}),
    
    el: "#navi",
    
		events: {
			"click li": "navigate",
			"click #generate": "generate"
		},
    
    initialize: function() {
      this.actionsMenu = new app.MenuActionsView();
      this.opticMenu = new app.MenuOpticView();
    },
    
    navigate: function(event) {
      var id = $(event.currentTarget).attr("id");
      if (id !== undefined) {
        var p = $(event.currentTarget).parent().attr("id");
        switch (p) {
          case "actions_menu":
            this.actionsMenu.navigate(id);
            break;
          case "optic_menu":
            this.opticMenu.navigate(id);
            break;
          default:
            app.router.navigate("edit/" + $(event.currentTarget).attr("id"), {trigger: true});
            break;
        }        
      }
    },
		
		generate: function() {
			var info = new app.GenerateInfoView();
			info.render();
			app.connection.generate(false, function(data) {
				info.displaySuccess(data)
			}, function(data) {
				info.displayError(data)
			});
		},
    
		// Re-render the navigation menu
		render: function (selection) {
      $(this.el).html(this.template.render({}));
      if (app.loadedApp) {
        this.actionsMenu.render();
        this.opticMenu.render();
      }
      $("#" + selection).toggleClass("active");
			return this;
		}
    
	});
}());