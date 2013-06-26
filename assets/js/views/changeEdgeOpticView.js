var app = app || {};

$(function () {
	'use strict';

	app.ChangeEdgeOpticView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeEdgeOpticView.ejs'}),
    
    el: "#content",
    
		events: {
      "click input:radio[name=label]": "selectLabelOption",
      "click input:radio[name=colour]": "selectColourOption",
      "submit form#edge": "submitOptic"
    },
    
    toggleBoxes: function (toHide, toShow) {
      delete toHide[toShow];
      _.each(toHide, function(v, h) {
        $("#" + h + "_box").hide();
      });
      $("#" + toShow + "_box").fadeIn();
    },
    
    selectLabelOption: function (event) {
      var id = $(event.currentTarget).attr("id");
      var toHide = {
        "label_attribute": true
      };
      this.toggleBoxes(toHide, id);
    },
    
    selectColourOption: function (event) {
      var id = $(event.currentTarget).attr("id");
      var toHide = {
        "colour_fixed": true,
        "colour_auto": true,
        "colour_direction": true
      };
      this.toggleBoxes(toHide, id);
    },
    
    addShapeJSON: function (res) {
      res.shape = {};
      var shpSel = $("input:radio[name=shape]:checked").val();
      switch (shpSel) {
        case "0":
          // shape NONE
          res.shape.type = 0;
          break;
        case "1":
          // shape Arrow
          res.shape.type = 1;
          break;
      }
    },
    
    addLabelJSON: function (res) {
      var lblSel = $("input:radio[name=label]:checked").val();
      if (lblSel === "attribute") {
        res.label = $("#label_key").val();
      }
    },
    
    addColourJSON: function (res) {
      res.color = {};
      var colSel = $("input:radio[name=colour]:checked").val();
      switch (colSel) {
        case "auto":
          res.color.type = "attribute";
          res.color.key = $("#colour_attribute").val();
          break;
        case "fixed":
          res.color.type = "single";
          res.color.stroke = "#" + $("#colour_foreground").val();
          break;
        case "gradient":
          res.color.type = "gradient";
          res.color.source = "#" + $("#colour_source").val();
          res.color.target = "#" + $("#colour_target").val();
          break;  
      }
      
    },
    
    submitOptic: function (event) {
      console.log("SubmitEdge");
      var res = {};
      this.addShapeJSON(res);
      this.addLabelJSON(res);
      this.addColourJSON(res);
      console.log(res);
      app.connection.updateConfig("edgeShaper", res);
      event.stopPropagation();
    },
    
		render: function () {
      var name = "edgeShaper";
			var self = this;
			app.connection.getConfigInfo(name, function(data) {
        $(self.el).html(self.template.render({data: data}));
        $('#colour_foreground, #colour_source, #colour_target').ColorPicker({
        	onSubmit: function(hsb, hex, rgb, el) {
        		$(el).val(hex);
            $(el).css("background", "#" + hex);
        		$(el).ColorPickerHide();
        	},
        	onBeforeShow: function () {
        		$(this).ColorPickerSetColor(this.value);
        	}
        })
        .bind('keyup', function(){
        	$(this).ColorPickerSetColor(this.value);
        });
			});
      return this;
		}
    
	});
}());