/*jslint indent: 2, nomen: true, maxlen: 100, white: true, plusplus: true, unparam: true */
/*global require, exports*/

////////////////////////////////////////////////////////////////////////////////
/// @brief A generator for Foxx Apps shipping the Graph Viewer.
///
/// @file This Document represents the repository communicating with ArangoDB
///
/// DISCLAIMER
///
/// Copyright 2010-2012 triagens GmbH, Cologne, Germany
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



(function () {
  "use strict";
  
  var _ = require("underscore"),
    db = require("internal").db,
    Foxx = require("org/arangodb/foxx"),
    whitelist = [
      "name",
      "description",
      "version",
      "edgeCollection",
      "nodeCollection"
    ],
    parseData = function(data) {
      var obj = {};
      _.each(whitelist, function(a) {
        if (data.hasOwnProperty(a)) {
          obj[a] = data[a];
        }
      });
      return obj;
    },
    checkData = function(data) {
      var passed = true;
      _.each(whitelist, function(a) {
        if (!data.hasOwnProperty(a)) {
          passed = false;
        }
      });
      return passed;
    },
    Repo = Foxx.Repository.extend({
      info: function(name) {
        return this.collection.document(name);
      },
      
      keys: function() {
        return _.pluck(this.collection.toArray(), "_key");
      },
      
      update: function(name, data) {
        data = parseData(data);
        delete data.name;
        require("console").log(JSON.stringify(data));
        return this.collection.update(name, data);
      },
      
      create: function(data) {
        data = parseData(data);
        if (checkData(data)) {
          data._key = data.name;
          return this.collection.save(data);
        }
        var message = "Malformed description. Please give:";
        message += " name, description, version,";
        message += " edgeCollection and nodeCollection.";
        throw new Error(message);        
      },
      
      del: function(name) {
        return this.collection.remove(name);
      },
      
      action: function(app, actName, actCode) {
        var data = {};
        if (actCode.toLowerCase() === "forbidden") {
          data[actName] = {forbidden: true};
        } else if (actCode.toLowerCase() === "default"){
          data[actName] = {default: true};
        } else {
          data[actName] = actCode;
        }
        return this.collection.update(app, data);
      },
      
			getAction: function(app, actName) {
				var doc = this.collection.document(app);
				return doc[actName] || {default: true};
			},
			
      
      buildConfig: function(name) {
        var doc = this.collection.document(name);
        var result = {};
        
        //Build general Config
        result.name = doc.name;
        result.teardown = doc.teardown;
        
        // Build the Manifest config
        result.manifest = {};
        result.manifest.name = doc.name;
        result.manifest.version = doc.version;
        result.manifest.description = doc.description;
        
        // Build the App config
        result.app = {};
        result.app.nodeCreate = doc.nodeCreate;
        result.app.nodePatch = doc.nodePatch;
        result.app.nodeDelete = doc.nodeDelete;
        result.app.edgeCreate = doc.edgeCreate;
        result.app.edgePatch = doc.edgePatch;
        result.app.edgeDelete = doc.edgeDelete;
        result.app.edgeForNodeDelete = doc.edgeForNodeDelete;
        
        // Build the collection config
        result.collections = {};
        result.collections.edges = doc.edgeCollection;
        result.collections.nodes = doc.nodeCollection;
        
        return result;
      }
    });

  exports.Repository = Repo;
  
}());
