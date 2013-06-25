var app = app || {};

$(function () {
	'use strict';

	app.MenuOpticView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/menuOpticView.ejs'}),
    
    navigate: function(id) {
      app.router.navigate("optic/" + id, {trigger: true});
    },
		    
		// Re-render the navigation menu
		render: function () {
      $("#optic_menu").html(this.template.text);
      this.delegateEvents();
			return this;
		}
    
	});
}());