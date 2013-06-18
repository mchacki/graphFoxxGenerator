var app = app || {};

(function() {
  "use strict";
  
  app.connection = {};
  
	var successHandler = function (success) {
		if (success) {
			return success;
		}
		return function() {
			alert("Success");
		}
	};
	
	var errorHandler = function (error) {
		if (error) {
			return error;
		}
		return function() {
			alert("Fail");
		}
	};
	
  var sendRequest = function (type, route, data, success, error) {
    $.ajax({
      type: type,
      url: route,
      data: JSON.stringify(data),
      contentType: "application/json",
      processData: false,
      success: successHandler(success),
      error: errorHandler(error)
    });
  };
  
  app.connection.createApp = function (name, description, version, nodes, edges, success, error) {
    var data = {
      name: name,
      description: description,
      version: version,
      nodeCollection: nodes,
      edgeCollection: edges
    };
    sendRequest("POST", "app", data, success, error);
  };
  
  app.connection.updateMetadata = function (description, version, nodes, edges, success, error) {
    var name = app.loadedApp;
    var data = {
      description: description,
      version: version,
      nodeCollection: nodes,
      edgeCollection: edges
    };
    sendRequest("PATCH", "app/" + name, data, success, error);
  };
  
  app.connection.updateAction = function(actionName, action, success, error) {
    var name = app.loadedApp;
		sendRequest("PATCH", "app/" + name + "/action/" + actionName, action, success, error);
  };
}());