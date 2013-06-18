var app = app || {};

$(function () {
	'use strict';

	app.ChangeActionView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeActionView.ejs'}),
    
    el: "#content",
    
    
		events: {
			"mouseover .tooltipLink": "showTip",
      "mouseout .tooltipLink": "hideTip",
			"mouseover .popoverLink": "showPopover",
      "mouseout .popoverLink": "hidePopover",
      "click input[type=radio]": "selectOption",
      "submit form#action": "submitAction"
		},
    
    selectOption: function (event) {
      if ($(event.currentTarget).attr("id") === "own") {
        $(".ownFunction").fadeIn();
        $('#function .ace_text-input').focus();
      } else {
        $(".ownFunction").fadeOut();
      }
    },
    
    showTip: function (event) {
      $(event.currentTarget).tooltip("show");
    },
    
    hideTip: function (event) {
      $(event.currentTarget).tooltip("hide");
    },    
    
    showPopover: function (event) {
      $(event.currentTarget).popover("show");
    },
    
    hidePopover: function (event) {
      $(event.currentTarget).popover("hide");
    },
    
    
    submitAction: function (event) {
      var content = $("input:radio[name=optUse]:checked").val();
      if (content === "own") {
        var editor = ace.edit("functionEditor");
        content = editor.getValue();
      }
      var data = {
        action: content
      };
      app.connection.updateAction(this.actionName, data);
      event.stopPropagation();
    },
    
		render: function (name) {
      this.actionName = name;
			var self = this;
			app.connection.getActionInfo(name, function(data) {
				var type = "";
				var action = "";
				if (data.default && data.default === true) {
					type = "default";
					action = "";
				} else if (data.forbidden && data.forbidden === true) {
					type = "forbidden";
					action = "";
				} else {
					type = "own";
					action = data;
				}
	      $(self.el).html(self.template.render({actionName: name, selected: type}));
	      var editor = ace.edit("functionEditor");
	      editor.getSession().setMode("ace/mode/javascript");
	      editor.setTheme("ace/theme/merbivore_soft");
				editor.setValue(action);
			});
			return this;
		}
    
	});
}());