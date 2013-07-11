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
    
    
    viewer: function() {
      if (!!this._viewer) {
        return this._viewer;
      }
      var config = {"nodeShaper":{"label":"label","shape":{"type":1,"radius":"12"},"color":{"type":"single","fill":"#36e1ff","stroke":"#8AA051"}},"edgeShaper":{"label":"label","shape":{"type":0},"color":{"type":"gradient","source":"#ff0000","target":"#00ff44"}},"layouter":{"charge":null,"gravity":1,"distance":40,"type":"force"},"toolbox":{"expand":true,"drag":true,"create":false,"edit":true,"delete":false},"actions":{"expand":false,"drag":false,"create":false,"edit":true,"delete":false}};
      this._viewer = new GraphViewerPreview(document.getElementById("previewDiv"), config);
			return this._viewer;
    },

    
		// Re-render the navigation menu
		render: function () {
      $(this.el).html(this.template.render({}));
      this.viewer();
			return this;
		}
    
	});
}());