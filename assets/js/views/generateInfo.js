var app = app || {};

$(function () {
	'use strict';

	app.GenerateInfoView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/generateInfoView.ejs'}),
    
    el: "#generateInfo",
    
		events: {
			"click #confirm": "forceGenerate",
			"click #decline": "hide",
			"hidden": "destroy"
    },
    
		
		destroy: function() {
			$(this.el).off('click', '#decline');
			$(this.el).off('click', '#confirm');
		},
		
		forceGenerate: function() {
			var self = this;
			this.render();
			app.connection.generate(true, function(data) {
				self.displaySuccess(data)
			}, function(data) {
				self.displayError(data)
			});
		},
		
		hide: function() {
			$(this.el).modal('hide');
		},
		
		displaySuccess: function(data) {
			this.render(data);
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