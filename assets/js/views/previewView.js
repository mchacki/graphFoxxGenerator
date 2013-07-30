var app = app || {};

$(function () {
	'use strict';

	app.PreviewView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/previewView.ejs'}),
    
    el: "#preview",
    
		events: {

		},
    
    initialize: function() {

    },
    
    updateViewer: function() {
      app.connection.getViewerConfig(function(config) {
        this._viewer = null;
        $("#previewDiv").empty();
        console.log(config.layout);
        this._viewer = new GraphViewerPreview(document.getElementById("previewDiv"), config);
      }, function() {});
    },

    
		// Re-render the navigation menu
		render: function () {
      $(this.el).html(this.template.render({}));
			return this;
		}
    
	});
}());