var app = app || {};

$(function () {
	'use strict';

	app.ChangeToolboxView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeToolboxView.ejs'}),
    
    el: "#content",
    
		events: {
      "submit form#toolbox": "submitOptic"
    },
    
    submitOptic: function (event) {
      var res = {};
      $("input:checkbox").map(function() {
        res[this.id] = this.checked;
      });
      app.connection.updateConfig("toolbox", res);
      event.stopPropagation();
    },
    
		render: function () {
      var name = "toolbox";
			var self = this;
			app.connection.getConfigInfo(name, function(data) {
        $(self.el).html(self.template.render({data: data}));
			});
      return this;
		}
	});
}());