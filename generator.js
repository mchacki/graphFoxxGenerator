(function() {
  "use strict";
    
  var FoxxApplication = require("org/arangodb/foxx").Controller,
    app = new FoxxApplication(applicationContext),
    r = require("lib/responder"),
    fs = require("fs"),
    fm = require("org/arangodb/foxx/manager"),
    path = applicationContext.basePath,
    TM = require("lib/templateManager").TemplateManager,
    man = new TM(path),
    console = require("console"),
    Configuration = require("repositories/configuration").Repository,
    config = new Configuration(app.collection("configuration")); 
  
  app.post("/app", function (req, res) {
    try {
      var result = config
        .create(JSON.parse(req.body()));
      r.sendCreated(res, result);
    } catch (err) {
      r.sendBadParam(res, err);
    }
  });
  
  app.patch("/app/:name", function (req, res) {
    r.sendOk(res, config.update(req.params("name"), JSON.parse(req.body())));
  });
  
  app.get("/app", function (req, res) {
    r.sendOk(res, config.keys());
  });
  
  app.get("/app/:name", function (req, res) {
    r.sendOk(res, config.info(req.params("name")));
  });
  
  app.del("/app/:name", function(req, res) {
    r.sendOk(res, config.del(req.params("name")));
  });

  app.get("/app/:appname/action/:actionname", function(req, res) {
    var app = req.params("appname");
    var name = req.params("actionname");
    var result = config.getAction(app, name);
    r.sendOk(res, result);
  });

  app.patch("/app/:appname/action/:actionname", function(req, res) {
    var content = JSON.parse(req.body());
    var app = req.params("appname");
    var name = req.params("actionname");
    var action = content.action;
    var result = config.action(app, name, action);
    r.sendOk(res, result);
  });

  app.patch("/app/:appname/config/:object", function(req, res) {
    var configuration = req.body();
    var app = req.params("appname");
    var obj = req.params("object");
    var result = config.config(app, obj, configuration);
    r.sendOk(res, result);
  });

  app.get("/app/:appname/config/:object", function(req, res) {
    var app = req.params("appname");
    var obj = req.params("object");
    var result = config.getConfig(app, obj);
    r.sendOk(res, result);
  });

  app.get("/config/:name", function(req, res) {
    r.sendOk(res, config.buildConfig(req.params("name")));
  });

  app.get("/viewerConfig/:name", function(req, res) {
    r.sendOk(res, config.buildViewerConfig(req.params("name")));
  });
  

  app.post("/generate/:name", function(req, res) {
    var content = JSON.parse(req.body());
    var overwrite = content.overwrite || false;
    var name = req.params("name");
    var appPath = "/" + name;
    if (overwrite) {
      try {
        fm.unmount(appPath);
        require("console").warn("Did uninstall App mounted on: " + appPath);
      } catch (e) {
        require("console").error("Could not uninstall App mounted on: " + appPath);
      }
    };
    var configure = config.buildConfig(name);
    var error = man.generateAll(configure, overwrite);
    if (error) {
      res.status(error.errorNum);
      res.body = error.errorMessage;
      console.error(error.errorNum, error.errorMessage);
    } else {
      fm.scanAppDirectory();
      try {
        fm.mount(name, appPath);
        r.sendCreated(res, {path: appPath});
      } catch(e) {
        res.status(e.errorNum);
        res.body = e.errorMessage;
        console.error(e.errorNum, e.errorMessage);
      }
    }
  });
  /*
  app.get('/route', function (req, res) {    
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
  .summary("summary")
  .notes("notes");

  app.get('/routeForced', function (req, res) {    
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
  .summary("summary")
  .notes("notes");  
  
  app.get('/test', function (req, res) {
    var overwrite = true;
    var name = "Test";
    var TM = require("lib/templateManager").TemplateManager;
    var man = new TM(path);
    var fm = require("org/arangodb/foxx-manager");
    var r = require("lib/responder");
    if (overwrite) {
      try {
        fm.uninstallApp("/" + name);
      } catch (e) {
        require("console").warn("Did uninstall App mounted on: /" + name);
      }
    };
    var error = man.generateAll(config.buildConfig("Test"), overwrite);
    if (error) {
      res.status(error.errorNum);
      res.body = error.errorMessage;
    } else {
      fm.scanAppDirectory();
      try {
        fm.installApp(name, "/" + name);
        r.sendCreated(res, "App generated successfully");
      } catch(e) {
        res.status(e.errorNum);
        res.body = e.errorMessage;
      }
    }
  });
  */
}());
