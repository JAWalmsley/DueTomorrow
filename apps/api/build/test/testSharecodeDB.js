"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var assert = require("assert");
var CourseDB_1 = require("../databaseManagers/CourseDB");
var SharecodeDB_1 = require("../databaseManagers/SharecodeDB");
var UserDB_1 = require("../databaseManagers/UserDB");
var sqlite3_1 = require("sqlite3");
describe('Sharecode Database', function () {
    var courseDB = new CourseDB_1.CourseDB('testdb.db');
    var sharecodeDB = new SharecodeDB_1.SharecodeDB('testdb.db');
    var userDB = new UserDB_1.UserDB('testdb.db');
    var testingCon = new sqlite3_1.Database('testdb.db');
    var testUser = {
        id: 'testuserid',
        password: 'testpassword',
        username: 'testusername'
    };
    var testCourse = {
        id: 'testcourseID',
        colour: '#FFFFFF',
        credits: 3,
        name: 'test course name',
        userid: testUser.id
    };
    var testCourse2 = {
        id: 'testcourseID2',
        colour: '#FF00FF',
        credits: 4,
        name: 'test course 2 name',
        userid: testUser.id
    };
    var testSharecode = {
        code: 'testsharecode',
        courseids: [testCourse.id, testCourse2.id]
    };
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, userDB.clearDB()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, courseDB.clearDB()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, sharecodeDB.clearDB()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, userDB.setUpTable()];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, userDB.create(testUser)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, courseDB.setUpTable()];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, courseDB.create(testCourse)];
                    case 9:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('sets up table', function (done) {
        sharecodeDB.setUpTable()
            .then(function () { return testingCon.get("SELECT name FROM sqlite_master WHERE type='table' AND name='sharecodes'", function (e, r) {
            assert.equal(r.name, 'sharecodes');
            done();
        }); })
            .catch(function (e) { return done(e); });
    });
    it('creates a sharecode', function (done) {
        sharecodeDB.setUpTable()
            .then(function () { return sharecodeDB.create(testSharecode); })
            .then(function (r) { return console.log("thing is", r); })
            .then(function () { return testingCon.all("SELECT * FROM sharecodes WHERE code = ?", testSharecode.code, function (e, r) {
            assert.notEqual(r, null);
            assert.equal(r.length, 2);
            assert.equal(r.some(function (item) { return item.courseid == testCourse.id; }), true);
            assert.equal(r.some(function (item) { return item.courseid == testCourse.id; }), true);
            done();
        }); })
            .catch(function (e) { return done(e); });
    });
    it('does not say a fake code exists', function (done) {
        sharecodeDB.setUpTable()
            .then(function () { return sharecodeDB.codeExists(testSharecode.code); })
            .then(function (response) { return assert.equal(response, false); })
            .then(function () { return done(); })
            .catch(function (e) { return done(e); });
    });
    it('says an existing code exists', function (done) {
        sharecodeDB.setUpTable()
            .then(function () { return sharecodeDB.create(testSharecode); })
            .then(function () { return sharecodeDB.codeExists(testSharecode.code); })
            .then(function (response) { return assert.equal(response, true); })
            .then(function () { return done(); })
            .catch(function (e) { return done(e); });
    });
    it('gets all the courses linked to a sharecode', function (done) {
        sharecodeDB.setUpTable()
            .then(function () { return sharecodeDB.create(testSharecode); })
            .then(function () { return sharecodeDB.getByCode(testSharecode.code); })
            .then(function (response) {
            assert.notEqual(response, null);
            assert.equal(response.code, testSharecode.code);
            assert.deepStrictEqual(response.courseids, testSharecode.courseids);
        })
            .catch(function (e) { return done(e); });
    });
});
