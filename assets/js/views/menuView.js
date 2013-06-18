var app = app || {};

$(function () {
	'use strict';

	app.MenuView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/menuView.ejs'}),
    
    el: "#navi",
    
    
		events: {
			"click li": "navigate"
		},
    
    navigate: function(event) {
      var id = $(event.currentTarget).attr("id");
      if (id !== undefined) {
        console.log("Click: " + id);
        app.router.navigate("edit/" + $(event.currentTarget).attr("id"), {trigger: true});
      }

    },
    
		// Re-render the navigation menu
		render: function (selection) {
      $(this.el).html(this.template.render({}));
      $("#" + selection).toggleClass("active");
			return this;
		}
    
	});
}());