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
      var self = this;
      app.connection.getViewerConfig(function(config) {
        self._viewer = null;
        $("#previewDiv").empty();
        self._viewer = new GraphViewerPreview(document.getElementById("previewDiv"), config);
        $(self.el).css("visibility", "visible");
      }, function() {});
    },

    
		// Re-render the navigation menu
		render: function () {
      $(this.el).html(this.template.render({}));
      if (app.loadedApp) {
        $(this.el).css("visibility", "visible");
      } else {
        $(this.el).css("visibility", "hidden");
      }
			return this;
		}
    
	});
}());