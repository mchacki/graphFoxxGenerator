(function() {
  "use strict";
  var FoxxApplication = require("org/arangodb/foxx").Application,
    app = new FoxxApplication();

  app.registerRepository(
    "geraffel", {
      repository: "repositories/templateBuilder"
    }
  );
  

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
  
  /*
  app.post('/repo', function (req, res) {
    //repositories.geraffel.collection = require("internal").db._collection("Test234");
    //res.json(repositories.geraffel);
    require("console").log("%s", JSON.stringify(req));
    require("console").log("%s", JSON.stringify(req.body()));
    //res.json("Hallo Welt");
    
  })
  .nickname("name")
  .summary("summary")
  .notes("notes");
  
  app.post('/repo2', function (req, res) {
    var options = {};
    options.method = req.requestType;
    require("console").log("%s", JSON.stringify(req));
    options.headers = req.headers;
    //options.headers.contentType = req.headers;
    var url = req.protocol + "://";
    url += req.server.address;
    url += ":" + req.server.port;
    url += req.url.replace("repo2", "repo");
    var result = require("internal").download(url, "{name: \"Foxx\"}", options);
    res.status(result.code);
    res.body = result.body;
    res.headers = result.headers;
  });
  */
  app.start(applicationContext);
}());
