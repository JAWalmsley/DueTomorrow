"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManager = exports.databaseFilename = void 0;
var mysql = require('mysql2');
var hash = require('object-hash');
var path = require("node:path");
var sqlite3_1 = require("sqlite3");
exports.databaseFilename = path.join(process.env.DB_FOLDER, '/database.db');
var DBManager = /** @class */ (function () {
    function DBManager(filename) {
        this.db = new sqlite3_1.Database(filename);
        this.db.run("PRAGMA foreign_keys = ON");
    }
    DBManager.prototype.makeReq = function (cmd, vals) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.all(cmd, vals, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    };
    ;
    return DBManager;
}());
exports.DBManager = DBManager;
