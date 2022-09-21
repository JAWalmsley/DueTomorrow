const express = require('express');
const session = require('express-session');
const router = express.Router({mergeParams: true});
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const config = require('./config.json');
const port = 80;

const users = require('./routes/users.js');
const assignments = require('./routes/assignments');
const courses = require('./routes/courses');

app.use(cors())
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

app.use('/users', users);
app.use('/users/:user/assignments', assignments)
app.use('/users/:user/courses', courses)

app.get('/', (req, res) => {
    res.send("hiiiii")
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
