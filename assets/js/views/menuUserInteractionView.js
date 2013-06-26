var app = app || {};

$(function () {
	'use strict';

	app.MenuUserInteractionView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/menuUserInteractionView.ejs'}),
    
    navigate: function(id) {
      app.router.navigate("ui/" + id, {trigger: true});
    },
		    
		// Re-render the navigation menu
		render: function () {
      $("#ui_menu").html(this.template.text);
      this.delegateEvents();
			return this;
		}
    
	});
}());