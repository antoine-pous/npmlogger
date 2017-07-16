"use strict";

var fs = require("fs");
var os = require("os");
var log = exports = module.exports = require("npmlog");
var mkpath = require("mkpath");
var dateFormat = require("dateformat");
var slug = require("slug");

slug.defaults.mode = "rfc3986";

log.fileLevel = "silly";

log.fileLevelSuffix = false;

log.fileCreatePath = false;

log.fileBasePath = require("path").dirname(require.main.filename) + "/logs/";

var filePath = require.main.filename.split("/");

log.fileName = filePath[filePath.length -1];

log.fileMaxSize = false;

log.fileColor = false;

log.fileSlugify = false;

log.fileDatePrefix = null;

log.fileEntriesTemplate = true;

log.on("log", function(l) {

  var date = new Date()

  if (log.levels[l.level] < log.levels[log.fileLevel]) {
    return false;
  }

  var entry = "";

  if (log.fileEntriesTemplate === true)  {
    entry = "[" + date.toString() + "] [" + l.level + "] ";

    if (l.prefix !== "")
      entry = entry.concat("[" + l.prefix + "] ");

  } else {
    entry.concat(l.prefix);
  }

  entry = log.fileColor === true ? entry.concat(l.message.trim()) : entry.concat(l.message.trim()).replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, "");

  entry = entry.concat(os.EOL);

  if(!log.fileBasePath.endsWith("/"))
    log.fileBasePath = log.fileBasePath.concat("/");

  if(!fs.existsSync(log.fileBasePath) && log.fileCreatePath === true)
    mkpath.sync(log.fileBasePath);

  var filename = log.fileName.endsWith(".log") === true ? log.fileName.slice(0, -4) : log.fileName;

  if(log.fileHeadPrefix === true && log.heading !== "")
    filename = log.heading.concat("_").concat(filename);

  if(typeof log.fileDatePrefix !== "string" && log.fileDatePrefix.trim() !== "")
    filename = dateFormat(date, log.fileDatePrefix).concat("_").concat(filename);

  if(log.fileLevelSuffix === true)
    filename = filename.concat("_").concat(l.level);

  if(log.fileSlugify === true)
    filename = slug(filename);

  fs.writeFile(log.fileBasePath + filename + ".log", entry, {"encoding": "utf8", "flag": "a+"}, function(err) {

    if(err) throw err;

    if(log.fileMaxSize !== false && parseInt(log.fileMaxSize)) {

      fs.stat(log.fileBasePath + filename + ".log", function(err, stats) {

        if(err) throw err;

        if(stats.size > (log.fileMaxSize * 1024)) {

          fs.readdir(log.fileBasePath, function(err, files) {

            if(err instanceof Error)
              throw err;

            var regex = new RegExp(filename + "_(\\d+)\.log");

            var f = 1;

            for(var i = 0; i < files.length; i++) {

              var m = regex.exec(files[i]);

              if(m !== null) {

                f = parseInt(m[1]) + 1;

              }

            }

            var cp = fs.createReadStream(log.fileBasePath + filename + ".log").pipe(fs.createWriteStream(log.fileBasePath + filename + "_" + f + ".log"));

            cp.on("close", function() {

              fs.writeFile(log.fileBasePath + filename + ".log", "", {"encoding": "utf8", "flag": "w"}, function(err) {
                if(err) throw err;
              });

            });

          });

        }

      });

    }

  });

});
