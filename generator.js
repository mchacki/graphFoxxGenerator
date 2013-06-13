(function() {
  "use strict";
  var FoxxApplication = require("org/arangodb/foxx").Application,
    app = new FoxxApplication();

  app.registerRepository(
    "configuration", {
      repository: "repositories/configuration"
    }
  );
  
  app.post("/app", function (req, res) {
    
  });
  
  app.patch("/app/:name", function (req, res) {
  
  });
  
  app.get("/app", function (req, res) {
  
  });
  
  app.get("/app/:name", function (req, res) {
    
  });

  app.get('/route', function (req, res) {
    var TM = require("lib/templateManager").TemplateManager;
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
    } else {
      res.status(201);
      res.body = "Creation of App complete";
    }
  })
  .nickname("name")
  .summary("summary")
  .notes("notes");

  app.get('/routeForced', function (req, res) {
    var TM = require("lib/templateManager").TemplateManager;
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
  
  
  app.get('/test', function (req, res) {
    var overwrite = true;
    var name = "Test";
    var TM = require("lib/templateManager").TemplateManager;
    var man = new TM();
    var fm = require("org/arangodb/foxx-manager");
    if (overwrite) {
      try {
        fm.uninstallApp("/" + name);
      } catch (e) {
        require("console").warn("Did uninstall App mounted on: /" + name);
      }
    };
    var error = man.generateAll({
      name: name,
      manifest: {
        name: name,
        version: "0.1.0",
        description: "My Test App"
      },
      app: {},
      collections: {
        edges: "e",
        nodes: "v"
      },
      teardown: true
    }, overwrite);
    if (error) {
      res.status(error.errorNum);
      res.body = error.errorMessage;
    } else {
      try {
        fm.installApp(name, "/" + name);
        res.status(201);
        res.body = "App generated successfully";
      } catch(e) {
        res.status(e.errorNum);
        res.body = e.errorMessage;
      }
    }
  });
  
  app.start(applicationContext);
}());
