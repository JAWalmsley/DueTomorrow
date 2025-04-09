import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import schedule from 'node-schedule';

const app = express();
const port = 3001;

import users from './routes/users';
import assignments from './routes/assignments';
import courses from './routes/courses';
import login from './routes/login';
import logout from './routes/logout';
import getSharecode from './routes/getSharecode';
import createSharecode from './routes/createSharecode';
import notifications from './routes/notifications';

import { sendReminderNotifications } from "./notificationSender"
import { assignmentDBInstance } from './databaseManagers/AssignmentDB';
import { courseDBInstance } from './databaseManagers/CourseDB';
import { userDBInstance } from './databaseManagers/UserDB';
import { sharecodeDBInstance } from './databaseManagers/SharecodeDB';
import { notificationDBInstance } from './databaseManagers/NotificationDB';

assignmentDBInstance.setUpTable();
courseDBInstance.setUpTable();
userDBInstance.setUpTable();
sharecodeDBInstance.setUpTable();
notificationDBInstance.setUpTable();

// Send push notifications every day for items due tomorrow
schedule.scheduleJob('0 22 * * *', sendReminderNotifications);

app.use(
    cors({
        origin: ['http://localhost:3000', 'http://192.168.2.187:3000'],
        credentials: true,
    })
);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: true,
        saveUninitialized: true,
        rolling: true,
        cookie: { maxAge: 2628000000 }, // One year
    })
);

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

app.use('/api/login', login);
app.use('/api/logout', logout);

app.use('/api/users', users);
app.use('/api/users/:userid/assignments', assignments);
app.use('/api/users/:userid/courses', courses);
app.use('/api/users/:userid/notifications', notifications)
app.use('/api/users/:userid/sharecodes', createSharecode);
app.use('/api/sharecodes', getSharecode);

app.get('/', (req, res) => {
    res.send('hiiiii');
});

sendReminderNotifications();

module.exports = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
