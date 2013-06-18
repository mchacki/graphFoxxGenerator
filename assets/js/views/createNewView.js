var app = app || {};

$(function () {
	'use strict';

	app.CreateNewView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeMetaView.ejs'}),
    
    el: "#content",
    
		events: {
    },
    
		render: function () {
      $(this.el).html(this.template.render({}));
      var valObj = app.validate.meta;
      var self = this;
      valObj.submitHandler = function () {
        var name = $("#name").val();
        var desc = $("#description").val();
        var vers = $("#version").val();
        var nodes = $("#nodeCollection").val();
        var edges = $("#edgeCollection").val();
        app.connection.createApp(name, desc, vers, nodes, edges, function(data) {
					app.loadedApp = data._key;
					app.router.navigate("edit/meta", {trigger: true});
				});
      };
      $("form#metaEdit").validate(valObj);
			return this;
		}
    
	});
}());