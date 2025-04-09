"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharecodeDBInstance = exports.SharecodeDB = void 0;
var dbManager_1 = require("./dbManager");
var SharecodeDB = /** @class */ (function (_super) {
    __extends(SharecodeDB, _super);
    function SharecodeDB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SharecodeDB.prototype.setUpTable = function () {
        return this.makeReq('CREATE TABLE IF NOT EXISTS sharecodes (code VARCHAR(50), courseid VARCHAR(255),PRIMARY KEY (code, courseid), FOREIGN KEY (courseid) REFERENCES courses(id) ON DELETE CASCADE);', []);
    };
    SharecodeDB.prototype.create = function (data) {
        var _this = this;
        return this.codeExists(data.code)
            .then(function (exists) {
            if (!exists) {
                var promises = data.courseids.map(function (courseid) {
                    return _this.makeReq('INSERT INTO sharecodes (code, courseid) VALUES (?, ?)', [data.code, courseid]);
                });
                return Promise.all(promises);
            }
        });
    };
    SharecodeDB.prototype.codeExists = function (code) {
        return this.makeReq('SELECT 1 FROM sharecodes WHERE code = ?', [code])
            .then(function (resp) {
            return (resp.length > 0);
        });
    };
    SharecodeDB.prototype.getByCode = function (code) {
        var returnData = { code: code, courseids: [] };
        return this.makeReq('SELECT * FROM sharecodes WHERE code = ?', [code])
            .then(function (response) {
            response.forEach(function (elem) {
                returnData.courseids.push(elem.courseid);
            });
        })
            .then(function () {
            return returnData;
        });
    };
    SharecodeDB.prototype.clearDB = function () {
        return this.makeReq('DELETE FROM sharecodes', []);
    };
    return SharecodeDB;
}(dbManager_1.DBManager));
exports.SharecodeDB = SharecodeDB;
exports.sharecodeDBInstance = new SharecodeDB(dbManager_1.databaseFilename);
