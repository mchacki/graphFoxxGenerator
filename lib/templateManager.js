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

exports.TemplateManager = function() {
  "use strict";
    
  var self = this;
  var templatePath = module.devAppPath() + "graphFoxxGenerator/templates/";
  var defaultPath = templatePath + "defaultFunctions/";
  //var str = fs.read(module.devAppPath() + "graphFoxxGenerator/templates/base.tmpl");
  var funcTmpl = _.template(fs.read(templatePath + "function.tmpl"));
  var appTmpl = _.template(fs.read(templatePath + "app.tmpl"));
  
  this._generateFunction = function (type, route, name, summary, notes, action) {
    return funcTmpl({
      type: type,
      route: route,
      name: name,
      summary: summary,
      notes: notes,
      action: action
    });
  };

  

  this._checkConfig = function (config) {
    var tmpl;
    if (!config) {
      config = {};
    }
    if (!config.nodeCreate) {
      tmpl = _.template(fs.read(defaultPath + "nodeCreate.tmpl"));
      config.nodeCreate = tmpl({});
    }
    if (!config.nodePatch) {
      tmpl = _.template(fs.read(defaultPath + "nodePatch.tmpl"));
      config.nodePatch = tmpl({});
    }
    if (!config.nodeDelete) {
      tmpl = _.template(fs.read(defaultPath + "nodeDelete.tmpl"));
      config.nodeDelete = tmpl({});
    }
    if (!config.edgeCreate) {
      tmpl = _.template(fs.read(defaultPath + "edgeCreate.tmpl"));
      config.edgeCreate = tmpl({});
    }
    if (!config.edgePatch) {
      tmpl = _.template(fs.read(defaultPath + "edgePatch.tmpl"));
      config.edgePatch = tmpl({});
    }
    if (!config.edgeDelete) {
      tmpl = _.template(fs.read(defaultPath + "edgeDelete.tmpl"));
      config.edgeDelete = tmpl({});
    }
    
    if (!config.edgeForNodeDelete) {
      tmpl = _.template(fs.read(defaultPath + "edgeForNodeDelete.tmpl"));
      config.edgeForNodeDelete = tmpl({});
    }
    
    
    return config;
  };

  this._generateApp = function(config) {
    config = self._checkConfig(config);
    return appTmpl({
      man: self,
      config: config
    });
  };

};


////////////////////////////////////
// Public Functions               //
////////////////////////////////////

exports.TemplateManager.prototype.nodesCreateFunction = function(action) {
  return this._generateFunction(
    "POST",
    "nodes",
    "nodes",
    "Create a new Node",
    "This function will create a new Node",
    action
  );
};

exports.TemplateManager.prototype.nodesPatchFunction = function(action) {
  return this._generateFunction(
    "PUT",
    "nodes/:id",
    "nodes",
    "Patch an existing Node",
    "This function will patch an existing Node",
    action
  );
};

exports.TemplateManager.prototype.nodesDeleteFunction = function(action) {
  return this._generateFunction(
    "DEL",
    "nodes/:id",
    "nodes",
    "Delete an existing Node",
    "This function will delete an existing Node",
    action
  );
};

exports.TemplateManager.prototype.edgesCreateFunction = function(action) {
  return this._generateFunction(
    "POST",
    "edges",
    "edges",
    "Create a new Edge",
    "This function will create a new Edge",
    action
  );
};

exports.TemplateManager.prototype.edgesPatchFunction = function(action) {
  return this._generateFunction(
    "PUT",
    "edges/:id",
    "edges",
    "Patch an existing Edge",
    "This function will patch an existing Edge",
    action
  );
};

exports.TemplateManager.prototype.edgesDeleteFunction = function(action) {
  return this._generateFunction(
    "DEL",
    "edges/:id",
    "edges",
    "Delete an existing Edge",
    "This function will delete an existing Edge",
    action
  );
};

exports.TemplateManager.prototype.edgesForNodeDeleteFunction = function(action) {
  return this._generateFunction(
    "DEL",
    "edges/forNode/:id",
    "edges",
    "Delete all edges adjacent to Node",
    "This function will delete all edges which are adjacent to the given node",
    action
  );
};

exports.TemplateManager.prototype.generateApp = function(config) {
  return this._generateApp(config);
};