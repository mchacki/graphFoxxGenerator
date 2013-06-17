var app = app || {};

(function() {
  "use strict";
  
  app.connection = {};
  
  app.connection.updateMetadata = function(name, description, version, nodes, edges) {
    var data = {
      description: description,
      version: version,
      nodeCollection: nodes,
      edgeCollection: edges
    };
    $.ajax({
      type: "PATCH",
      url: "app/" + name,
      data: JSON.stringify(data),
      contentType: "application/json",
      processData: false,
      success: function(data) {
        alert("Success");
      },
      error: function(data) {
        alert("Fail");
      }
    });
  };
}());