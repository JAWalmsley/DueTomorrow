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
exports.CourseDB = void 0;
var dbManager_1 = require("./dbManager");
var CourseDB = /** @class */ (function (_super) {
    __extends(CourseDB, _super);
    function CourseDB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CourseDB.prototype.setUpTable = function () {
        return this.makeReq('CREATE TABLE IF NOT EXISTS courses (id VARCHAR(255) PRIMARY KEY, userid VARCHAR(255), name VARCHAR(255), colour VARCHAR(7), credits INTEGER, FOREIGN KEY (userid) REFERENCES logins(id) ON DELETE CASCADE);', []);
    };
    CourseDB.prototype.create = function (data) {
        return this.makeReq('INSERT INTO courses (id, userid, name, colour, credits) VALUES (?, ?, ?, ?, ?)', [data.id, data.userid, data.name, data.colour, data.credits]);
    };
    CourseDB.prototype.getByUserID = function (userid) {
        return this.makeReq('SELECT * FROM courses WHERE userid = ?', [userid]);
    };
    CourseDB.prototype.getByID = function (id) {
        return this.makeReq('SELECT * FROM courses WHERE id = ?', [id])
            .then(function (result) {
            return result[0];
        });
    };
    CourseDB.prototype.deleteByID = function (id) {
        return this.makeReq('DELETE FROM courses WHERE id = ?', [id]);
    };
    CourseDB.prototype.clearDB = function () {
        return this.makeReq('DELETE FROM courses', []);
    };
    return CourseDB;
}(dbManager_1.DBManager));
exports.CourseDB = CourseDB;
