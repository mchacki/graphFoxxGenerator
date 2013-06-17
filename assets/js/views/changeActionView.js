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
      "click input[type=radio]": "selectOption"
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
    
		// Re-render the navigation menu
		render: function (name, type) {
      type = type || "default";
      $(this.el).html(this.template.render({actionName: name, selected: type}));
      var editor = ace.edit("functionEditor");
      editor.getSession().setMode("ace/mode/javascript");
      editor.setTheme("ace/theme/merbivore_soft");
			return this;
		}
    
	});
}());