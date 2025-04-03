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
var sqlite3_1 = require("sqlite3");
var UserDB_1 = require("../databaseManagers/UserDB");
describe('Course Database', function () {
    var courseDB = new CourseDB_1.CourseDB('testdb.db');
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
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, courseDB.clearDB()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, userDB.clearDB()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, userDB.setUpTable()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, userDB.create(testUser)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('sets up table', function () {
        courseDB.setUpTable().then(function () {
            testingCon.get("SELECT name FROM sqlite_master WHERE type='table' AND name='courses';", function (e, r) {
                assert.equal(r.name, 'courses');
            });
        });
    });
    it('creates a course', function (done) {
        courseDB.setUpTable()
            .then(function () { return courseDB.create(testCourse); })
            .then(function () { return testingCon.get("SELECT * FROM courses WHERE id = ?;", testCourse.id, function (e, r) {
            assert.equal(r.id, testCourse.id);
            assert.equal(r.colour, testCourse.colour);
            assert.equal(r.credits, testCourse.credits);
            done();
        }); })
            .catch(function (e) { return done(e); });
    });
    it('gets a course', function (done) {
        courseDB.setUpTable()
            .then(function () { return courseDB.create(testCourse); })
            .then(function () { return courseDB.getByID(testCourse.id); })
            .then(function (response) {
            assert.equal(response.id, testCourse.id);
            assert.equal(response.colour, testCourse.colour);
            done();
        })
            .catch(function (e) { return done(e); });
    });
    it('gets all a user\'s courses', function (done) {
        courseDB.setUpTable()
            .then(function () { return courseDB.create(testCourse); })
            .then(function () { return courseDB.create(testCourse2); })
            .then(function () { return courseDB.getByUserID(testCourse.userid); })
            .then(function (response) {
            assert.notEqual(response, null);
            assert.equal(response.length, 2);
            assert.equal(response.some(function (item) { return item.id == testCourse.id; }), true);
            assert.equal(response.some(function (item) { return item.id == testCourse2.id; }), true);
            done();
        })
            .catch(function (e) { return done(e); });
    });
    it('does not get a nonexistant course', function (done) {
        courseDB.setUpTable()
            .then(function () { return courseDB.getByID('doesntexist'); })
            .then(function (response) {
            assert.equal(response, null);
            done();
        })
            .catch(function (e) { return done(e); });
    });
    it('deletes a course', function (done) {
        courseDB.setUpTable()
            .then(function () { return courseDB.create(testCourse); })
            .then(function () { return courseDB.deleteByID(testCourse.id); })
            .then(function () { return testingCon.get("SELECT * FROM courses WHERE id = ?", testCourse.id, function (e, r) {
            assert.equal(r, null);
            done();
        }); })
            .catch(function (e) { return done(e); });
    });
});
