var app = app || {};

$(function () {
	'use strict';

	app.MenuActionsView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/menuActionsView.ejs'}),
    
    navigate: function(id) {
      app.router.navigate("action/" + id, {trigger: true});
    },
		    
		// Re-render the navigation menu
		render: function () {
      $("#actions_menu").html(this.template.text);
      this.delegateEvents();
			return this;
		}
    
	});
}());