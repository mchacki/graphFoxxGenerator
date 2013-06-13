/*jslint indent: 2, nomen: true, maxlen: 100, white: true, plusplus: true, unparam: true */
/*global require, exports*/

////////////////////////////////////////////////////////////////////////////////
/// @brief A Generator for Foxx Apps delivering the Graph Viewer.
///
/// @file This Document represents the repository communicating with ArangoDB
///
/// DISCLAIMER
///
/// Copyright 2010-2013 triagens GmbH, Cologne, Germany
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
/// Copyright holder is triAGENS GmbH, Cologne, Germany
///
/// @author Michael Hackstein
/// @author Copyright 2011-2013, triAGENS GmbH, Cologne, Germany
////////////////////////////////////////////////////////////////////////////////

var fs = require("fs");
var _ = require("underscore");
var console = require("console");
var ArangoError = require("org/arangodb").ArangoError;
var internal = require("internal");

exports.TemplateManager = function() {
  "use strict";
    
  var self = this;
  var templatePath = fs.join(module.devAppPath(), "graphFoxxGenerator/templates");
  var defaultPath = fs.join(templatePath, "defaultFunctions");
  var funcTmpl = _.template(fs.read(fs.join(templatePath, "function.tmpl")));
  var appTmpl = _.template(fs.read(fs.join(templatePath, "app.tmpl")));
  var libTmpl = _.template(fs.read(fs.join(templatePath, "storageLib.tmpl")));
  var manifestTmpl = _.template(fs.read(fs.join(templatePath, "manifest.tmpl")));
  var forbiddenTmpl = _.template(fs.read(fs.join(defaultPath, "forbidden.tmpl")));
  
  this._checkLibConfig = function (config) {
    if (!config) {
      console.warn("Configuration for the collections has to be given.");
      return false;
    }
    if (!config.edges) {
      console.warn("A edge collection has to be given.");
      return false;
    }
    if (!config.nodes) {
      console.warn("A nodes collection has to be given.");
      return false;
    }
    return true;
  };
  
  this._generateLib = function(config) {
    if (!self._checkLibConfig(config)) {
      return;
    }
    
    return libTmpl({
      nodes: config.nodes,
      edges: config.edges
    });
  };
  
  this._generateFunction = function (type, route, name, summary, notes, config) {
    var action;
    if (config.forbidden === true) {
      action = forbiddenTmpl();
    } else {
      action = config.action;
    }
    return funcTmpl({
      type: type,
      route: route,
      name: name,
      summary: summary,
      notes: notes,
      action: action
    });
  };

  this._checkManifestConfig = function (config) {
    if (!config) {
      console.warn("Configuration for Manifest file has to be given.");
      return false;
    }
    if (!config.name) {
      console.warn("A name for the App has to be defined.");
      return false;
    }
    if (!config.version) {
      console.warn("A version number for the App has to be defined.");
      return false;
    }
    if (!config.description) {
      console.warn("A description for the App has to be given.")
      return false;
    }
    return true;
  };

  this._checkFunctionsConfig = function (config) {
    var tmpl;
    if (!config) {
      config = {};
    }
    if (!config.nodeCreate) {
      tmpl = _.template(fs.read(fs.join(defaultPath, "nodeCreate.tmpl")));
      config.nodeCreate = {
        action: tmpl({})
      };
    }
    if (!config.nodePatch) {
      tmpl = _.template(fs.read(fs.join(defaultPath, "nodePatch.tmpl")));
      config.nodePatch = {
        action: tmpl({})
      };
    }
    if (!config.nodeDelete) {
      tmpl = _.template(fs.read(fs.join(defaultPath, "nodeDelete.tmpl")));
      config.nodeDelete = {
        action: tmpl({})
      };
    }
    if (!config.edgeCreate) {
      tmpl = _.template(fs.read(fs.join(defaultPath, "edgeCreate.tmpl")));
      config.edgeCreate = {
        action: tmpl({})
      };
    }
    if (!config.edgePatch) {
      tmpl = _.template(fs.read(fs.join(defaultPath, "edgePatch.tmpl")));
      config.edgePatch = {
        action: tmpl({})
      };
    }
    if (!config.edgeDelete) {
      tmpl = _.template(fs.read(fs.join(defaultPath, "edgeDelete.tmpl")));
      config.edgeDelete = {
        action: tmpl({})
      };
    }
    
    if (!config.edgeForNodeDelete) {
      tmpl = _.template(fs.read(fs.join(defaultPath, "edgeForNodeDelete.tmpl")));
      config.edgeForNodeDelete = {
        action: tmpl({})
      };
    }
    return config;
  };

  this._generateApp = function(config) {
    config = self._checkFunctionsConfig(config);
    console.log(JSON.stringify(config));
    return appTmpl({
      man: self,
      config: config
    });
  };
  
  this._generateManifest = function(config) {
    if(self._checkManifestConfig(config)) {
      return manifestTmpl({config: config});
    }
  };

};


////////////////////////////////////
// Public Functions               //
////////////////////////////////////

exports.TemplateManager.prototype.nodesCreateFunction = function(config) {
  return this._generateFunction(
    "POST",
    "nodes",
    "nodes",
    "Create a new Node",
    "This function will create a new Node",
    config
  );
};

exports.TemplateManager.prototype.nodesPatchFunction = function(config) {
  return this._generateFunction(
    "PUT",
    "nodes/:id",
    "nodes",
    "Patch an existing Node",
    "This function will patch an existing Node",
    config
  );
};

exports.TemplateManager.prototype.nodesDeleteFunction = function(config) {
  return this._generateFunction(
    "DEL",
    "nodes/:id",
    "nodes",
    "Delete an existing Node",
    "This function will delete an existing Node",
    config
  );
};

exports.TemplateManager.prototype.edgesCreateFunction = function(config) {
  return this._generateFunction(
    "POST",
    "edges",
    "edges",
    "Create a new Edge",
    "This function will create a new Edge",
    config
  );
};

exports.TemplateManager.prototype.edgesPatchFunction = function(config) {
  return this._generateFunction(
    "PUT",
    "edges/:id",
    "edges",
    "Patch an existing Edge",
    "This function will patch an existing Edge",
    config
  );
};

exports.TemplateManager.prototype.edgesDeleteFunction = function(config) {
  return this._generateFunction(
    "DEL",
    "edges/:id",
    "edges",
    "Delete an existing Edge",
    "This function will delete an existing Edge",
    config
  );
};

exports.TemplateManager.prototype.edgesForNodeDeleteFunction = function(config) {
  return this._generateFunction(
    "DEL",
    "edges/forNode/:id",
    "edges",
    "Delete all edges adjacent to Node",
    "This function will delete all edges which are adjacent to the given node",
    config
  );
};

/******************************************************************************
* Required Parameter config:
* config.name = Name of the App
* config.version = Version Number
* config.description = Descriptive Text
*******************************************************************************/

exports.TemplateManager.prototype.generateManifest = function(config) {
  return this._generateManifest(config);
};

exports.TemplateManager.prototype.generateApp = function(config) {
  return this._generateApp(config);
};
/******************************************************************************
* Required Parameter config:
* config.name = Name of the App
* config.app = Configuration for the app.js
* config.manifest = Configuration for the manifest.json
*******************************************************************************/
exports.TemplateManager.prototype.generateAll = function(config, forced) {
  var error = new ArangoError();
  var appPath = fs.join(module.devAppPath(), config.name);
  if (!config || !config.name || !config.manifest) {
    error.errorNum = internal.errors.ERROR_HTTP_BAD_PARAMETER;
    error.errorMessage = "Error in the configuration file.";
    return error;
  }
  if (fs.exists(appPath)) {
    if (!forced) {
      error.errorNum = 409;
      error.errorMessage = "App with this name allready exists. Use overwrite: true.";
      return error;
    } else {
      // We are not allowed to delete in the App-Path.
      // So move to Temp and delete there.
      var pathToDel = fs.join(fs.getTempPath(), "graphViewerDelete");
      fs.move(appPath, pathToDel);
      if (fs.isDirectory(pathToDel)) {
        fs.removeDirectoryRecursive(pathToDel);
      } else {
        fs.remove(pathToDell);
      }
    }
  }
  fs.makeDirectory(appPath);
  var app = fs.join(appPath, "app.js");
  var manifest = fs.join(appPath, "manifest.json");
  
  fs.write(app, this.generateApp(config.app));
  fs.write(manifest, this.generateManifest(config.manifest));
};