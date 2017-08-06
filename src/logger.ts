"use strict";

declare let require: NodeRequire;

import * as fs from "fs-extra";
import * as os from "os";
import {dirname, sep as dirSep} from "path";
import * as logger from "npmlog";
import * as dateFormat from "dateformat"
import * as slug from "slug";

export let log = logger;

const mainPath :any = (require as any).main.filename;

slug.defaults.mode = "rfc3986";

log.fileLevel = "silly";

log.fileLevelSuffix = false;

log.fileCreatePath = false;

log.fileBasePath = dirname(mainPath) + "/logs/";

let filePath = mainPath.split(dirSep);

log.fileName = filePath[filePath.length -1];

log.fileMaxSize = false;

log.fileColor = false;

log.fileSlugify = false;

log.fileDatePrefix = null;

log.fileEntriesTemplate = true;

log.on("log", async function(l) {

  let date = new Date();

  if (log.levels[l.level] < log.levels[log.fileLevel]) {
    return false;
  }

  let entry = "";

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

  try {
    await fs.ensureDir(log.fileBasePath)
  } catch (e) {
    // Create logs dir if it doesn't exit.
    if(log.fileCreatePath === true) await fs.mkdirs(log.fileBasePath)
  }

  let filename = log.fileName.endsWith(".log") === true ? log.fileName.slice(0, -4) : log.fileName;

  if(log.fileHeadPrefix === true && log.heading !== "")
    filename = log.heading.concat("_").concat(filename);

  if(typeof log.fileDatePrefix === "string" && log.fileDatePrefix.trim())
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

            let regex = new RegExp(filename + "_(\\d+)\.log");

            let f = 1;

            for(let i = 0; i < files.length; i++) {

              let m = regex.exec(files[i]);

              if(m !== null) {

                f = parseInt(m[1]) + 1;

              }

            }

            let cp = fs.createReadStream(log.fileBasePath + filename + ".log").pipe(fs.createWriteStream(log.fileBasePath + filename + "_" + f + ".log"));

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

export default log;
module.exports = log;
