npmlogger
===========

[![Build Status](https://travis-ci.org/antoine-pous/npmlogger.svg?branch=master)](https://travis-ci.org/antoine-pous/npmlogger)
[![Dependency Status](https://img.shields.io/gemnasium/antoine-pous/npmlogger.svg)](https://gemnasium.com/antoine-pous/npmlogger)
[![Donate](https://img.shields.io/badge/%E2%99%A5-donate-459042.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MAKZLQGRSBCT2)

NPM Logger is a package designed to write easily your log files. For more convenience npmlogger extends npmlog, so you can use it
with minor changes in your application code.

## Installation

```console
npm install npmlogger --save
```

## Basic Usage
```javascript
// Call npmlogger instead of npmlog
var log = require('npmlogger');

// Set the log level required to be written
log.fileLevel = 'warn';

// Set the basepath for log files
log.fileBasePath = './logs';

// Set the filename
log.fileName = 'mylog.log';

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

When this feature is enabled, the path is automaticly created. Use [mkpath](https://www.npmjs.com/package/mkpath) package.

### log.fileLevel

* {String}

The level to write logs. Any logs at or above this level will be written. The special level `silent` will prevent anything from being logged ever.

### log.fileColor

* {Bool}

By default npmlogger remove all console colors from file. You can allow colors by setting this option to true.

### log.fileMaxSize

* {Number}

Set the max size for the log file, when the limit is reached the file is moved and a new one is created. The size is exprimed in `kilobyte`. The new file is
named `mylog_1.log` or `mylog_error_1.log` if you enable [log.fileLevelSuffix][3].

### log.fileDatePrefix

* {String} See [dateformat](https://www.npmjs.com/package/dateformat) documentation

This option allow you to prefix the filename with your own date format.

**Note:** The date prefix is always put **before** [log.fileHeadPrefix][4].

### log.fileHeadPrefix

* {Bool}

This option allow you to prefix the files with the [log.heading][1] value like `heading_mylog.log`.

**Important** It is highly recommended to use slug keyword for [log.heading][1] or enable [log.fileSlugify][2] when [log.fileHeadPrefix][4] is enabled.

### log.fileLevelSuffix

* {Bool}

This option create seperated log file for each log level. So you can have `mylog_error.log`, `mylog_warn.log`, `mylog_info.log` etc...

**Important** It is highly recommended to use slug keyword for custom level or enable [log.fileSlugify][2] when [log.fileLevelSuffix][3] is enabled.

### log.fileSlugify

* {Bool}

When this feature is enabled the filename is slugified using [RCF3986](https://www.ietf.org/rfc/rfc3986.txt) standard.

### log.fileEntriesTemplate

* {Bool}

When disabled this option remove the current default template and let you decide how to manage your entries.

**Note:** The template is `[date] [level] [prefixes] error`, when disabled you only have `prefix error`.

## Bug & suggestions
If you have any suggestions or found a bug feel free to use the [tracker](https://github.com/antoine-pous/npmlogger/issues).

[1]: https://github.com/npm/npmlog#logheading
[2]: #logfileslugify
[3]: #logfilelevelsuffix
[4]: #logfileheadprefix
