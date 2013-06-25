var app = app || {};

$(function () {
	'use strict';

	app.ChangeNodeOpticView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeNodeOpticView.ejs'}),
    
    el: "#content",
    
		events: {
    },
    
		render: function () {
      $(this.el).html(this.template.render({}));
		}
    
	});
}());