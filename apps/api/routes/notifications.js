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
var NotificationDB_1 = require("../databaseManagers/NotificationDB");
var express = require('express');
var webpush = require('web-push');
var router = express.Router({ mergeParams: true });
var isUserAuthorized = require("./userAuth").isUserAuthorized;
if (process.env.VAPID_PUBLIC != null) {
    webpush.setVapidDetails('https://duetomorrow.ca', process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE);
}
else {
    console.log("DEBUG MODE, not sending any push notifications");
}
router.post('/', isUserAuthorized, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newNotification;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // console.log("Got a notification request", req);
                if (!(req.body))
                    return [2 /*return*/, res.status(400).send('Insufficient data given')];
                newNotification = {
                    auth: req.body.keys.auth,
                    endpoint: req.body.endpoint,
                    p256dh: req.body.keys.p256dh,
                    userid: req.params.userid
                };
                return [4 /*yield*/, NotificationDB_1.notificationDBInstance.create(newNotification)];
            case 1:
                _a.sent();
                webpush.sendNotification(req.body, JSON.stringify({ title: 'DueTomorrow', body: 'Ready to get notifications!' })).catch(function (err) { return console.log(err); });
                res.status(200).send('Notification registered');
                return [2 /*return*/];
        }
    });
}); });
router.put('/', isUserAuthorized, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var oldSub, newSub, newNotification;
    return __generator(this, function (_a) {
        // console.log("Got a notification request", req);
        if (!(req.body))
            return [2 /*return*/, res.status(400).send('Insufficient data given')];
        oldSub = req.body.oldSubscription;
        newSub = req.body.newSubscription;
        console.log("Refreshing a push sub", oldSub, newSub);
        if (oldSub === undefined || newSub === undefined)
            return [2 /*return*/, res.status(400).send('Insufficient data given')];
        newNotification = {
            auth: newSub.keys.auth,
            endpoint: newSub.endpoint,
            p256dh: newSub.keys.p256dh,
            userid: req.params.userid
        };
        NotificationDB_1.notificationDBInstance.create(newNotification);
        NotificationDB_1.notificationDBInstance.deleteByEndpoint(oldSub.endpoint);
        res.status(200).send('Notification registered');
        return [2 /*return*/];
    });
}); });
module.exports = router;
