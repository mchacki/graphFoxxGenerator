var app = app || {};

$(function () {
	'use strict';

	app.ChangeEdgeOpticView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeEdgeOpticView.ejs'}),
    
    el: "#content",
    
		events: {
    },
    
		render: function () {
      $(this.el).html(this.template.render({}));
		}
    
	});
}());