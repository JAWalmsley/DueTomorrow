const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const config = require('./config.json');
const port = 80;

const users = require('./routes/users.js');
const assignments = require('./routes/assignments');
const courses = require('./routes/courses');
const login = require('./routes/login')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(helmet())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: config.jwtSecret,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {maxAge: 2628000000} // One year
}));

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

app.use('/api/login', login);

app.use('/api/users', users);
app.use('/api/users/:userid/assignments', assignments)
app.use('/api/users/:userid/courses', courses)

app.get('/', (req, res) => {
    res.send("hiiiii")
})

module.exports = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});