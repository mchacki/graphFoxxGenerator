var app = app || {};

$(function () {
	'use strict';

	app.ChangeNodeOpticView = Backbone.View.extend({
    
    template: new EJS({url: 'templates/changeNodeOpticView.ejs'}),
    
    el: "#content",
    
		events: {
      "click input:radio[name=shape]": "selectShapeOption",
      "click input:radio[name=label]": "selectLabelOption",
      "click input:radio[name=colour]": "selectColourOption",
      "submit form#node": "submitOptic"
    },
    
    toggleBoxes: function (toHide, toShow) {
      delete toHide[toShow];
      _.each(toHide, function(v, h) {
        $("#" + h + "_box").hide();
      });
      $("#" + toShow + "_box").fadeIn();
    },
    
    selectShapeOption: function (event) {
      var id = $(event.currentTarget).attr("id");
      var toHide = {
        "shape_circle": true,
        "shape_rect": true,
        "shape_image": true
      };
      this.toggleBoxes(toHide, id);
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
        "colour_auto": true
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
          // shape CIRCLE
          res.shape.type = 1;
          res.shape.radius = $("#radius").val();
          break;
        case "2":
          // shape RECT
          res.shape.type = 2;
          res.shape.width = $("#rect_width").val();
          res.shape.height = $("#rect_height").val();
          break;
        case "3":
          // shape IMAGE
          res.shape.type = 3;
          res.shape.width = $("#image_width").val();
          res.shape.height = $("#image_height").val();
          res.shape.default = $("#default").val();
          res.shape.source = $("#image").val();
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
          res.color.fill = "#" + $("#colour_background").val();
          res.color.stroke = "#" + $("#colour_foreground").val();
          break;
      }
      
    },
    
    submitOptic: function (event) {
      console.log("SubmitNode");
      var res = {};
      this.addShapeJSON(res);
      this.addLabelJSON(res);
      this.addColourJSON(res);
      app.connection.updateConfig("nodeShaper", res);
      event.stopPropagation();
    },
    
		render: function () {
      var name = "nodeShaper";
			var self = this;
			app.connection.getConfigInfo(name, function(data) {
        console.log(data);
        $(self.el).html(self.template.render({data: data}));
        $('#colour_background, #colour_foreground').ColorPicker({
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