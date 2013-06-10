(function() {
  "use strict";
  var FoxxApplication = require("org/arangodb/foxx").Application,
    app = new FoxxApplication();

  app.get('/route', function (req, res) {
    var console = require("console");
    var TM = require("templateManager").TemplateManager;
    var man = new TM();
    var _ = require("underscore");
    var fs = require("fs");
    fs.write(module.devAppPath() + "/meierei.js", man.generateApp());
    
    
    //console.log(man.nodesCreateFunction("Hallo Welt"));
  })
  .nickname("name")
  .summary("summary")
  .notes("notes");
  
  

  
  app.start(applicationContext);
}());
