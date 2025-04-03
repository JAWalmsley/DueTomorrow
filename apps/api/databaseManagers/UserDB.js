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
exports.UserDB = void 0;
var dbManager_1 = require("./dbManager");
var UserDB = /** @class */ (function (_super) {
    __extends(UserDB, _super);
    function UserDB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserDB.prototype.setUpTable = function () {
        return this.makeReq('CREATE TABLE IF NOT EXISTS logins (id VARCHAR(255) PRIMARY KEY, username VARCHAR(255), password VARCHAR(255));', []);
    };
    /**
     * Create a user
     * @returns {Promise} mySQL query Promise
     */
    UserDB.prototype.create = function (data) {
        return this.makeReq('INSERT INTO logins (id, username, password) VALUES (?, ?, ?)', [data.id, data.username, data.password]);
    };
    /**
     * Gets a user by username
     * @param {string} username - The username to search by
     * @returns {Promise<userData>} The first result in the results (should be the only result)
     */
    UserDB.prototype.getByUsername = function (username) {
        return this.makeReq('SELECT * FROM logins WHERE username = ?', [
            username,
        ]).then(function (result) {
            return result[0];
        });
    };
    /**
     * Gets all users in the database
     * @returns all users
     */
    UserDB.prototype.getAll = function () {
        return this.makeReq('SELECT * FROM logins', []);
    };
    /**
     * Gets a user by userid
     * @param {string} userid - The userid to search by
     * @returns {Promise<Object>} The first result in the results (should be the only result)
     */
    UserDB.prototype.getByUserID = function (userid) {
        return this.makeReq('SELECT * FROM logins WHERE id = ?', [
            userid,
        ]).then(function (result) {
            return result[0];
        });
    };
    /**
     * Updates a user
     * @param userid - The id to update
     * @param newpass - The new password to replace
     */
    UserDB.prototype.setPassword = function (id, newpass) {
        return this.makeReq('UPDATE logins SET password = ? WHERE id = ?', [
            newpass, id
        ]).then(function (res) {
            return res;
        });
    };
    UserDB.prototype.clearDB = function () {
        return this.makeReq('DELETE FROM logins', []);
    };
    return UserDB;
}(dbManager_1.DBManager));
exports.UserDB = UserDB;
;
