var app = app || {};

(function() {
  "use strict";
  
  app.connection = {};
  
  var sendRequest = function (type, route, data) {
    $.ajax({
      type: type,
      url: route,
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
  
  app.connection.createApp = function (name, description, version, nodes, edges) {
    var data = {
      name: name,
      description: description,
      version: version,
      nodeCollection: nodes,
      edgeCollection: edges
    };
    sendRequest("POST", "app", data);
  };
  
  app.connection.updateMetadata = function (description, version, nodes, edges) {
    var name = app.loadedApp;
    var data = {
      description: description,
      version: version,
      nodeCollection: nodes,
      edgeCollection: edges
    };
    sendRequest("PATCH", "app/" + name, data);
  };
  
  app.connection.updateAction = function(actionName, action) {
    var name = app.loadedApp;
    $.ajax({
      type: "PATCH",
      url: "app/" + name + "/action/" + actionName,
      data: JSON.stringify(action),
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