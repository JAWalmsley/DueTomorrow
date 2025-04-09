"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var node_schedule_1 = __importDefault(require("node-schedule"));
var app = (0, express_1.default)();
var port = 3001;
var users_1 = __importDefault(require("./routes/users"));
var assignments_1 = __importDefault(require("./routes/assignments"));
var courses_1 = __importDefault(require("./routes/courses"));
var login_1 = __importDefault(require("./routes/login"));
var logout_1 = __importDefault(require("./routes/logout"));
var getSharecode_1 = __importDefault(require("./routes/getSharecode"));
var createSharecode_1 = __importDefault(require("./routes/createSharecode"));
var notifications_1 = __importDefault(require("./routes/notifications"));
var notificationSender_1 = require("./notificationSender");
var AssignmentDB_1 = require("./databaseManagers/AssignmentDB");
var CourseDB_1 = require("./databaseManagers/CourseDB");
var UserDB_1 = require("./databaseManagers/UserDB");
var SharecodeDB_1 = require("./databaseManagers/SharecodeDB");
var NotificationDB_1 = require("./databaseManagers/NotificationDB");
AssignmentDB_1.assignmentDBInstance.setUpTable();
CourseDB_1.courseDBInstance.setUpTable();
UserDB_1.userDBInstance.setUpTable();
SharecodeDB_1.sharecodeDBInstance.setUpTable();
NotificationDB_1.notificationDBInstance.setUpTable();
// Send push notifications every day for items due tomorrow
node_schedule_1.default.scheduleJob('0 22 * * *', notificationSender_1.sendReminderNotifications);
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://192.168.2.187:3000'],
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 2628000000 }, // One year
}));
app.use('/css', express_1.default.static(__dirname + '/css'));
app.use('/js', express_1.default.static(__dirname + '/js'));
app.use('/api/login', login_1.default);
app.use('/api/logout', logout_1.default);
app.use('/api/users', users_1.default);
app.use('/api/users/:userid/assignments', assignments_1.default);
app.use('/api/users/:userid/courses', courses_1.default);
app.use('/api/users/:userid/notifications', notifications_1.default);
app.use('/api/users/:userid/sharecodes', createSharecode_1.default);
app.use('/api/sharecodes', getSharecode_1.default);
app.get('/', function (req, res) {
    res.send('hiiiii');
});
(0, notificationSender_1.sendReminderNotifications)();
module.exports = app.listen(port, function () {
    console.log("Listening at http://localhost:".concat(port));
});
