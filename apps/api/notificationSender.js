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
var AssignmentDB_1 = require("./databaseManagers/AssignmentDB");
var CourseDB_1 = require("./databaseManagers/CourseDB");
var NotificationDB_1 = require("./databaseManagers/NotificationDB");
var UserDB_1 = require("./databaseManagers/UserDB");
var webpush = require('web-push');
if (process.env.VAPID_PUBLIC != null) {
    webpush.setVapidDetails('https://duetomorrow.ca', process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE);
}
else {
    console.log("DEBUG MODE, not sending any push notifications");
}
function sendReminderNotifications() {
    return __awaiter(this, void 0, void 0, function () {
        var users, _i, users_1, user, subscriptions, _a, subscriptions_1, subscription, assignments, _b, assignments_1, assignment, d, daysUntil, course;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("Sending scheduled notifications");
                    return [4 /*yield*/, UserDB_1.userDBInstance.getAll()];
                case 1:
                    users = _c.sent();
                    _i = 0, users_1 = users;
                    _c.label = 2;
                case 2:
                    if (!(_i < users_1.length)) return [3 /*break*/, 11];
                    user = users_1[_i];
                    return [4 /*yield*/, NotificationDB_1.notificationDBInstance.getByUserID(user.id)];
                case 3:
                    subscriptions = _c.sent();
                    if (subscriptions.length === 0)
                        return [3 /*break*/, 10];
                    _a = 0, subscriptions_1 = subscriptions;
                    _c.label = 4;
                case 4:
                    if (!(_a < subscriptions_1.length)) return [3 /*break*/, 10];
                    subscription = subscriptions_1[_a];
                    return [4 /*yield*/, AssignmentDB_1.assignmentDBInstance.getByUserID(user.id)];
                case 5:
                    assignments = _c.sent();
                    _b = 0, assignments_1 = assignments;
                    _c.label = 6;
                case 6:
                    if (!(_b < assignments_1.length)) return [3 /*break*/, 9];
                    assignment = assignments_1[_b];
                    if (assignment.done)
                        return [3 /*break*/, 8]; // Dont notify for finished assignments
                    d = new Date(assignment.due);
                    daysUntil = (d.valueOf() - new Date().valueOf()) / (1000 * 60 * 60 * 24);
                    if (!(daysUntil < 1 && daysUntil > -1)) return [3 /*break*/, 8];
                    return [4 /*yield*/, CourseDB_1.courseDBInstance.getByID(assignment.courseid)];
                case 7:
                    course = (_c.sent())[0];
                    sendPush(assignment, course, subscription);
                    _c.label = 8;
                case 8:
                    _b++;
                    return [3 /*break*/, 6];
                case 9:
                    _a++;
                    return [3 /*break*/, 4];
                case 10:
                    _i++;
                    return [3 /*break*/, 2];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function sendPush(assignment, course, subscription) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, webpush.sendNotification({
                        endpoint: subscription.endpoint,
                        keys: {
                            auth: subscription.auth,
                            p256dh: subscription.p256dh
                        }
                    }, JSON.stringify({ title: course.name, body: assignment.name + ' is due tomorrow' })).catch(function (err) {
                        if (err.statusCode === 410) {
                            // Delete this endpoint because the subscription expired (error 410)
                            NotificationDB_1.notificationDBInstance.deleteByEndpoint(subscription.endpoint);
                        }
                        else {
                            console.log(err);
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = sendReminderNotifications;
