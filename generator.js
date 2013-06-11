(function() {
  "use strict";
  var FoxxApplication = require("org/arangodb/foxx").Application,
    app = new FoxxApplication();

  app.get('/route', function (req, res) {
    var TM = require("templateManager").TemplateManager;
    var man = new TM();
    
    var error = man.generateAll({
      name: "Test",
      manifest: {
        name: "Test",
        version: "0.1.0",
        description: "My Test App"
      }
    });
    if (error) {
      res.status(error.errorNum);
      res.body = error.errorMessage;
    }
  })
  .nickname("name")
  .summary("summary")
  .notes("notes");

  app.get('/routeForced', function (req, res) {
    var TM = require("templateManager").TemplateManager;
    var man = new TM();
    
    var error = man.generateAll({
      name: "Test",
      manifest: {
        name: "Test",
        version: "0.1.0",
        description: "My Test App"
      },
      app: {
        nodeDelete: {
          forbidden: true
        }
      }
    }, true);
    if (error) {
      res.status(error.errorNum);
      res.body = error.errorMessage;
    }
  })
  .nickname("name")
  .summary("summary")
  .notes("notes");  
  
  app.start(applicationContext);
}());
