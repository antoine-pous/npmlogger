npmlogger
===========

[![npm](https://img.shields.io/npm/l/npmlogger.svg)](https://www.npmjs.com/package/npmlogger)
[![Build Status](https://travis-ci.org/antoine-pous/npmlogger.svg?branch=master)](https://travis-ci.org/antoine-pous/npmlogger)
[![github](https://img.shields.io/github/release/antoine-pous/npmlogger.svg)](https://github.com/antoine-pous/npmlogger/releases)
[![npm](https://img.shields.io/npm/dt/npmlogger.svg)](https://www.npmjs.com/package/npmlogger)

[![npm](https://nodei.co/npm/npmlogger.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/npmlogger)

NPM Logger is a package designed to write easily your log files. For more convenience npmlogger extends npmlog, so you can use it
with minor changes in your application code.

## Installation

```console
npm install npmlogger
```

## Basic Usage
```javascript
// Call npmlogger instead of npmlog
var log = require('npmlogger');

// Set the log level required to be written
log.fileLevel = 'warn';

// Set the basepath for log files
log.fileBasePath = './logs';

// Set the filename without extension, it's always .log
log.fileName = 'mylog';

// write error log to mylog.log
log.info('My prefix', 'i am info'); // Displayed but not written
log.error('My prefix', 'i am error'); // Displayed and written
```

Output :
```txt
[Fri Feb 03 2017 18:14:44 GMT+0100 (CET)] [error] [My prefix] i am error
```

## Configuration

**Note:** All npmlogger methods and variables start with `file`.

### log.fileName

* {String}

The file name, `.log` extension is automaticly added at the end of name.

### log.fileBasePath

* {String}

The base path for the logs file, by default this is the `logs` directory related to the executed file.

### log.fileCreatePath

* {Bool}

When this feature is enabled, the path is automaticly created.

### log.fileLevel

* {String}

The level to write logs. Any logs at or above this level will be written. The special level `silent` will prevent anything from being logged ever.

### log.fileMaxSize

* {Number}

Set the max size for the log file, when the limit is reached the file is moved and a new one is created. The size is exprimed in `kilobyte`. The new file is
named `mylog_1.log` or `mylog_error_1.log` if you enable `log.fileLevelSuffix`.

### log.fileLevelSuffix

* {Bool}

This option create seperated log file for each log level. So you can have `mylog_error.log`, `mylog_warn.log`, `mylog_info.log` etc...

## Bug & suggestions
If you have any suggestions or have found a bug feel free to use the [tracker](https://github.com/antoine-pous/npmlogger/issues).
