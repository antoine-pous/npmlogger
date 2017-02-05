'use strict';

var fs = require('fs');
var os = require('os');
var log = exports = module.exports = require('npmlog');
var mkpath = require('mkpath');
var dateFormat = require('dateformat');

log.fileLevel = 'silly';

log.fileLevelSuffix = false;

log.fileCreatePath = false;

log.fileBasePath = require('path').dirname(require.main.filename) + '/logs/';

log.fileName = require.main.filename;

log.fileMaxSize = false;

log.fileColor = false;

log.on('log', function(l) {

  if(log.levels[l.level] < log.levels[log.fileLevel]) {
    return false;
  }

  var entry = '[' + (new Date()).toString() + '] [' + l.level +'] ';

  if(l.prefix !== '')
    entry = entry.concat('[' + l.prefix + '] ');

  entry = log.fileColor === true ? entry.concat(l.message.trim()) : entry.concat(l.message.trim()).replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '');

  entry = entry.concat(os.EOL);

  if(!log.fileBasePath.endsWith('/'))
    log.fileBasePath = log.fileBasePath.concat('/');

  if(!fs.existsSync(log.fileBasePath) && log.fileCreatePath === true)
    mkpath.sync(log.fileBasePath);

  var filename = log.fileName;

  if(log.fileHeadPrefix === true && log.heading !== '')
    filename = log.heading.concat('_').concat(filename);

  if(log.fileDatePrefix !== '')
    filename = dateFormat(new Date(), log.fileDatePrefix).concat('_').concat(filename);

  if(log.fileLevelSuffix === true)
    filename = filename.concat('_').concat(l.level);

  fs.writeFileSync(log.fileBasePath + filename + '.log', entry, {"encoding": "utf8", "flag": "a+"});

  if(log.fileMaxSize !== false && parseInt(log.fileMaxSize)) {

    var maxSize = log.fileMaxSize * 1024;

    if(fs.statSync(log.fileBasePath + filename + '.log').size > (log.fileMaxSize * 1024)) {

      fs.readdir(log.fileBasePath, function(err, files) {

        if(err instanceof Error)
          throw err;

        var regex = new RegExp(filename + '_(\\d+)\.log');

        var f = 1;

        for(var i = 0; i < files.length; i++) {

          var m = regex.exec(files[i]);

          if(m !== null) {

            f = parseInt(m[1]) + 1;

          }

        }

        var cp = fs.createReadStream(log.fileBasePath + filename + '.log').pipe(fs.createWriteStream(log.fileBasePath + filename + '_' + f + '.log'));

        cp.on('close', function() {

          fs.writeFileSync(log.fileBasePath + filename + '.log', '', {"encoding": "utf8", "flag": "w"});

        });

      });

    }

  }

});
