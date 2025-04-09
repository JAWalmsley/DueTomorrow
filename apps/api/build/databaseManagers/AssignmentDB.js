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
exports.assignmentDBInstance = exports.AssignmentDB = void 0;
var dbManager_1 = require("./dbManager");
var AssignmentDB = /** @class */ (function (_super) {
    __extends(AssignmentDB, _super);
    function AssignmentDB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssignmentDB.prototype.setUpTable = function () {
        return this.makeReq('CREATE TABLE IF NOT EXISTS assignments (id VARCHAR(255) PRIMARY KEY, userid VARCHAR(255), courseid VARCHAR(255), name VARCHAR(255),  due DATE, done BOOLEAN, weight INTEGER, grade INTEGER NULL, FOREIGN KEY (userid) REFERENCES logins(id) ON DELETE CASCADE, FOREIGN KEY (courseid) REFERENCES courses(id) ON DELETE CASCADE);', []);
    };
    AssignmentDB.prototype.create = function (data) {
        return this.makeReq('INSERT INTO assignments (id, userid, courseid, name, due, done, weight, grade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.id, data.userid, data.courseid, data.name, data.due, data.done, data.weight, data.grade]);
    };
    AssignmentDB.prototype.getByID = function (id) {
        return this.makeReq('SELECT * FROM assignments WHERE id = ?', [id]).then(function (result) {
            return result[0];
        });
        ;
    };
    AssignmentDB.prototype.getByUserID = function (userid) {
        return this.makeReq('SELECT * FROM assignments WHERE userid = ? ORDER BY done, due, weight DESC', [userid]);
    };
    AssignmentDB.prototype.getByCourseID = function (courseid) {
        return this.makeReq('SELECT * FROM assignments WHERE courseid = ?', [courseid]);
    };
    AssignmentDB.prototype.setDoneStatus = function (id, done) {
        return this.makeReq('UPDATE assignments SET done = ? WHERE id = ?', [done, id]);
    };
    AssignmentDB.prototype.setGrade = function (id, grade) {
        return this.makeReq('UPDATE assignments SET grade = ? WHERE id = ?', [grade, id]);
    };
    AssignmentDB.prototype.setWeight = function (id, weight) {
        return this.makeReq('UPDATE assignments SET weight = ? WHERE id = ?', [weight, id]);
    };
    AssignmentDB.prototype.deleteByID = function (id) {
        return this.makeReq('DELETE FROM assignments WHERE id = ?', [id]);
    };
    AssignmentDB.prototype.clearDB = function () {
        return this.makeReq('DELETE FROM assignments', []);
    };
    return AssignmentDB;
}(dbManager_1.DBManager));
exports.AssignmentDB = AssignmentDB;
exports.assignmentDBInstance = new AssignmentDB(dbManager_1.databaseFilename);
