var app = app || {};

$(function () {
	'use strict';

	app.LoadAppView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/loadAppView.ejs'}),
    
    el: "#content",
    
		events: {
			"submit #loadApp": "loadApp"
    },
    
		loadApp: function () {
			app.loadedApp = $("#selectApp").val();
      app.preview.updateViewer();
			app.router.navigate("edit/meta", {trigger: true});
		},
		
		render: function () {
			var self = this;
			app.connection.getApps(function(data) {
				$(self.el).html(self.template.render({names: data}));
			});
			return this;
		}
    
	});
}());