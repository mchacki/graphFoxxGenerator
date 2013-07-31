var app = app || {};

(function() {
  "use strict";
  
  app.connection = {};
  
	var successHandler = function (success, updatePreview, omitSuccess) {

		if (success) {
      if (!omitSuccess) {
        return function(d) {
          success(d);
          if (updatePreview) {
            app.preview.updateViewer();
          }
        }
      }
			return success;
		}
    if (!omitSuccess) {
      return function() {
        if (updatePreview) {
          app.preview.updateViewer();
        }
      }
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
	
  var sendRequest = function (type, route, data, success, error, omitSuccess) {
    $.ajax({
      type: type,
      url: route,
      data: JSON.stringify(data),
      contentType: "application/json",
      processData: false,
      success: successHandler(success, type !== "GET", omitSuccess),
      error: errorHandler(error)
    });
  };
  
  app.connection.createApp = function (name, author, description, version, nodes, edges, success, error) {
    var data = {
      name: name,
      author: author,
      description: description,
      version: version,
      nodeCollection: nodes,
      edgeCollection: edges
    };
    sendRequest("POST", "app", data, success, error);
  };
  
  app.connection.updateMetadata = function (author, description, version, nodes, edges, success, error) {
    var name = app.loadedApp;
    var data = {
      author: author,
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
	
  app.connection.updateConfig = function(className, config, success, error) {
    var name = app.loadedApp;
		sendRequest("PATCH", "app/" + name + "/config/" + className, config, success, error);
  };
  
	app.connection.getApps = function(success, error) {
		sendRequest("GET", "app", undefined, success, error);
	}; 
	
	app.connection.getAppInfo = function(success, error) {
		var name = app.loadedApp;
		sendRequest("GET", "app/" + name, undefined, success, error);
	}; 
	
	app.connection.getActionInfo = function(actionName, success, error) {
		var name = app.loadedApp;
		sendRequest("GET", "app/" + name + "/action/" + actionName, undefined, success, error);
	};
	
  app.connection.getConfigInfo = function(className, success, error) {
		var name = app.loadedApp;
		sendRequest("GET", "app/" + name + "/config/" + className, undefined, success, error);
  };
  
  app.connection.getViewerConfig = function(success, error) {
		var name = app.loadedApp;
    if (name) {
      sendRequest("GET", "viewerConfig/" + name, undefined, success, error, true);
    }
  };
  
	app.connection.generate = function(forced, success, error) {
		var name = app.loadedApp;
		var body = {};
		if (forced) {
			body.overwrite = true;
		}
		sendRequest("POST", "generate/" + name, body, success, error);
	};
}());