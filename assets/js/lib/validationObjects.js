var app = app || {};

(function() {
  "use strict";
  
  app.validate = {};
  
  var valObj = {};
  var rules = {};
  var messages = {};
    
  valObj.rules = rules;
  valObj.messages = messages;
  
  
  rules.description = {};
  messages.description = {};
  rules.description.minlength = 10;
  messages.description.minlength = $.format("Enter at least {0} characters");
  
  
  rules.version = {};
  messages.version = {};
  rules.version.minlength = 5;
  messages.version.minlength = $.format("Enter at least {0} characters");
  
  rules.nodeCollection = {};
  messages.nodeCollection = {};
  rules.nodeCollection.minlength = 1;
  messages.nodeCollection.minlength = $.format("Enter at least {0} characters");
  
  rules.edgeCollection = {};
  messages.edgeCollection = {};
  rules.edgeCollection.minlength = 1;
  messages.edgeCollection.minlength = $.format("Enter at least {0} characters");
  
  app.validate.meta = valObj;
}());