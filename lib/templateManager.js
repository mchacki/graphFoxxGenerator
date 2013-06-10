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

exports.TemplateManager = function() {
  "use strict";
    
  var self = this;
  var templatePath = module.devAppPath() + "graphFoxxGenerator/templates/";
  //var str = fs.read(module.devAppPath() + "graphFoxxGenerator/templates/base.tmpl");
  var funcTmpl = _.template(fs.read(templatePath + "function.tmpl"));
  
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