var app = app || {};

$(function () {
	'use strict';

	app.ChangeMetaView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeMetaView.ejs'}),
    
    el: "#content",
    
		events: {
    },
    
		render: function () {
			var self = this;
			app.connection.getAppInfo(function (data) {
	      $(self.el).html(self.template.render(data));
	      var valObj = app.validate.meta;
	      valObj.submitHandler = function () {
          var aut = $("#author").val();
	        var desc = $("#description").val();
	        var vers = $("#version").val();
	        var nodes = $("#nodeCollection").val();
	        var edges = $("#edgeCollection").val();
	        app.connection.updateMetadata(aut, desc, vers, nodes, edges);
	      };
	      $("form#metaEdit").validate(valObj);
			});
			return this;
		}
    
	});
}());