var app = app || {};

$(function () {
	'use strict';

	app.ChangeLayoutOpticView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeLayoutOpticView.ejs'}),
    
    el: "#content",
    
		events: {
    },
    
		render: function () {
      $(this.el).html(this.template.render({}));
		}
    
	});
}());