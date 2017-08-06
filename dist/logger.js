"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var os = require("os");
var path_1 = require("path");
var logger = require("npmlog");
var dateFormat = require("dateformat");
var slug = require("slug");
exports.log = logger;
var mainPath = require.main.filename;
slug.defaults.mode = "rfc3986";
exports.log.fileLevel = "silly";
exports.log.fileLevelSuffix = false;
exports.log.fileCreatePath = false;
exports.log.fileBasePath = path_1.dirname(mainPath) + "/logs/";
var filePath = mainPath.split(path_1.sep);
exports.log.fileName = filePath[filePath.length - 1];
exports.log.fileMaxSize = false;
exports.log.fileColor = false;
exports.log.fileSlugify = false;
exports.log.fileDatePrefix = null;
exports.log.fileEntriesTemplate = true;
exports.log.on("log", function (l) {
    return __awaiter(this, void 0, void 0, function () {
        var date, entry, e_1, filename;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = new Date();
                    if (exports.log.levels[l.level] < exports.log.levels[exports.log.fileLevel]) {
                        return [2 /*return*/, false];
                    }
                    entry = "";
                    if (exports.log.fileEntriesTemplate === true) {
                        entry = "[" + date.toString() + "] [" + l.level + "] ";
                        if (l.prefix !== "")
                            entry = entry.concat("[" + l.prefix + "] ");
                    }
                    else {
                        entry.concat(l.prefix);
                    }
                    entry = exports.log.fileColor === true ? entry.concat(l.message.trim()) : entry.concat(l.message.trim()).replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, "");
                    entry = entry.concat(os.EOL);
                    if (!exports.log.fileBasePath.endsWith("/"))
                        exports.log.fileBasePath = exports.log.fileBasePath.concat("/");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 6]);
                    return [4 /*yield*/, fs.ensureDir(exports.log.fileBasePath)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 3:
                    e_1 = _a.sent();
                    if (!(exports.log.fileCreatePath === true)) return [3 /*break*/, 5];
                    return [4 /*yield*/, fs.mkdirs(exports.log.fileBasePath)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 6];
                case 6:
                    filename = exports.log.fileName.endsWith(".log") === true ? exports.log.fileName.slice(0, -4) : exports.log.fileName;
                    if (exports.log.fileHeadPrefix === true && exports.log.heading !== "")
                        filename = exports.log.heading.concat("_").concat(filename);
                    if (typeof exports.log.fileDatePrefix === "string" && exports.log.fileDatePrefix.trim())
                        filename = dateFormat(date, exports.log.fileDatePrefix).concat("_").concat(filename);
                    if (exports.log.fileLevelSuffix === true)
                        filename = filename.concat("_").concat(l.level);
                    if (exports.log.fileSlugify === true)
                        filename = slug(filename);
                    fs.writeFile(exports.log.fileBasePath + filename + ".log", entry, { "encoding": "utf8", "flag": "a+" }, function (err) {
                        if (err)
                            throw err;
                        if (exports.log.fileMaxSize !== false && parseInt(exports.log.fileMaxSize)) {
                            fs.stat(exports.log.fileBasePath + filename + ".log", function (err, stats) {
                                if (err)
                                    throw err;
                                if (stats.size > (exports.log.fileMaxSize * 1024)) {
                                    fs.readdir(exports.log.fileBasePath, function (err, files) {
                                        if (err instanceof Error)
                                            throw err;
                                        var regex = new RegExp(filename + "_(\\d+)\.log");
                                        var f = 1;
                                        for (var i = 0; i < files.length; i++) {
                                            var m = regex.exec(files[i]);
                                            if (m !== null) {
                                                f = parseInt(m[1]) + 1;
                                            }
                                        }
                                        var cp = fs.createReadStream(exports.log.fileBasePath + filename + ".log").pipe(fs.createWriteStream(exports.log.fileBasePath + filename + "_" + f + ".log"));
                                        cp.on("close", function () {
                                            fs.writeFile(exports.log.fileBasePath + filename + ".log", "", { "encoding": "utf8", "flag": "w" }, function (err) {
                                                if (err)
                                                    throw err;
                                            });
                                        });
                                    });
                                }
                            });
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = exports.log;
module.exports = exports.log;
