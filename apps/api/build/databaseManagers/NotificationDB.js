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
exports.notificationDBInstance = exports.NotificationDB = void 0;
var dbManager_1 = require("./dbManager");
var NotificationDB = /** @class */ (function (_super) {
    __extends(NotificationDB, _super);
    function NotificationDB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotificationDB.prototype.setUpTable = function () {
        return this.makeReq('CREATE TABLE IF NOT EXISTS notifications (userid VARCHAR(255), endpoint TEXT PRIMARY KEY, p256dh TEXT, auth TEXT, FOREIGN KEY (userid) REFERENCES logins(id) ON DELETE CASCADE)', []);
    };
    NotificationDB.prototype.create = function (data) {
        return this.makeReq('INSERT INTO notifications (userid, endpoint, p256dh, auth) VALUES (?, ?, ?, ?)', [data.userid, data.endpoint, data.p256dh, data.auth]);
    };
    NotificationDB.prototype.getByUserID = function (userid) {
        return this.makeReq('SELECT * FROM notifications WHERE userid = ?', [userid]);
    };
    NotificationDB.prototype.deleteByEndpoint = function (endpoint) {
        return this.makeReq('DELETE FROM notifications WHERE endpoint = ?', [endpoint]);
    };
    NotificationDB.prototype.clearDB = function () {
        return this.makeReq('DELETE FROM notifications', []);
    };
    return NotificationDB;
}(dbManager_1.DBManager));
exports.NotificationDB = NotificationDB;
exports.notificationDBInstance = new NotificationDB(dbManager_1.databaseFilename);
