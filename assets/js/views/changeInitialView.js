var app = app || {};

$(function () {
	'use strict';

	app.ChangeInitialView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeInitialView.ejs'}),
    
    el: "#content",
    
		events: {
      "submit form#initial": "submitInitial"
    },
    
    submitInitial: function (event) {
      var res = {};
      $("input:radio").map(function() {
        res[this.id] = this.checked;
      });
      delete res.none;
      app.connection.updateConfig("actions", res);
      event.stopPropagation();
    },
    
		render: function () {
      var name = "actions";
			var self = this;
			app.connection.getConfigInfo(name, function(data) {
        $(self.el).html(self.template.render({data: data}));
			});
      return this;
		}
		
	});
}());