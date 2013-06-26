var app = app || {};

$(function () {
	'use strict';

	app.ChangeLayoutOpticView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeLayoutOpticView.ejs'}),
    
    el: "#content",
    
		events: {
      "submit form#layout": "submitOptic"
    },
    
    submitOptic: function (event) {
      var res = {};
      var g = $("#gravity").val();
      var d = $("#distance").val();
      var c = $("#charge").val();
      res.type = "force"; // Hardcoded due to no alternative
      res.gravity = parseFloat(g) || null;
      res.distance = parseFloat(d) || null;
      res.charge = (-1 * parseFloat(c)) || null;
      app.connection.updateConfig("layouter", res);
      event.stopPropagation();
    },
    
		render: function () {
      var name = "layouter";
			var self = this;
			app.connection.getConfigInfo(name, function(data) {
        $(self.el).html(self.template.render({data: data}));
			});
      return this;
		}
		
    
	});
}());