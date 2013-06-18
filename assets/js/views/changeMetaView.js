var app = app || {};

$(function () {
	'use strict';

	app.ChangeMetaView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeMetaView.ejs'}),
    
    el: "#content",
    
		events: {
    },
    
		render: function () {
      $(this.el).html(this.template.render({name: app.loadedApp}));
      var valObj = app.validate.meta;
      var self = this;
      valObj.submitHandler = function () {
        var desc = $("#description").val();
        var vers = $("#version").val();
        var nodes = $("#nodeCollection").val();
        var edges = $("#edgeCollection").val();
        app.connection.updateMetadata(desc, vers, nodes, edges);
      };
      $("form#metaEdit").validate(valObj);
			return this;
		}
    
	});
}());