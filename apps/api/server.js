const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const schedule = require('node-schedule');

const app = express();
const port = 3001;

const users = require('./routes/users.js');
const assignments = require('./routes/assignments');
const courses = require('./routes/courses');
const login = require('./routes/login');
const logout = require('./routes/logout');
const getSharecode = require('./routes/getSharecode.js');
const createSharecode = require('./routes/createSharecode');
const notifications = require('./routes/notifications');

const sendReminderNotifications = require('./notificationSender.js');

// Send push notifications every day for items due tomorrow
schedule.scheduleJob('0 18 * * *', sendReminderNotifications);

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

module.exports = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
