var app = app || {};

$(function () {
	'use strict';

	app.GenerateInfoView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/generateInfoView.ejs'}),
    
    el: "#generateInfo",
    
		events: { 
    },
    
		
		displaySuccess: function(data) {
			console.log("%s", JSON.stringify(data));
		},
		
		displayError: function(data) {
			if (data.status === 409) {
				this.render({requestOverwrite: true});
			} else {
				console.log("%s", JSON.stringify(data));
			}
		},
		
		render: function (context) {
			context = context || {};
      $(this.el).html(this.template.render(context));
			$(this.el).modal('show');
			return this;
		}
    
	});
}());