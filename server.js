const express = require('express');
const session = require('express-session');
const uuid = require('uuid');

const login = require('./login');
const register = require('./register');
const dbManager = require('./dbManager');

const config = require('./config.json');

const port = 3000;

const app = express();

app.use(
    session({
        secret: config.jwtSecret,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

app.get('/', (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    let assig = dbManager.Assignment.getByUserID(req.session.userid);
    let cour = dbManager.Course.getByUserID(req.session.userid);

    Promise.all([assig, cour])
        .then(function ([a, c]) {
            res.render('index', {
                username: req.session.username,
                assignments: a,
                courses: c,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/gpa', (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    let assig = dbManager.Assignment.getByUserID(req.session.userid);
    let cour = dbManager.Course.getByUserID(req.session.userid);

    Promise.all([assig, cour])
        .then(function ([a, c]) {
            res.render('gpa', {
                username: req.session.username,
                assignments: a,
                courses: c
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/courses', (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    dbManager.Course.getByUserID(req.session.userid).then(function (result) {
        res.render('courses', {
            username: req.session.username,
            courses: result,
        });
    });
});

app.post('/complete', (req, res) => {
    dbManager.Assignment.setComplete(req.body.item, req.body.done)
        .then(function (result) {
            // console.log("Number updated: " + result.affectedRows)
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
        });
    
});

app.post('/setGrade', (req, res) => {
    dbManager.Assignment.setGrade(req.body.id, req.body.grade)
    .then(function(result) {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

app.post('/deleteAssignment', (req, res) => {
    dbManager.Assignment.delete(req.body.item)
        .then(function (result) {
            // console.log("Number updated: " + result.affectedRows)
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    res.sendStatus(200);
});

app.post('/newcourse', (req, res) => {
    dbManager.Course.create(
        uuid.v4(),
        req.session.userid,
        req.body.courseName,
        req.body.colour,
        req.body.credits
    )
        .then(function (result) {
            // console.log("Number of records inserted: " + result.affectedRows);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post('/deleteCourse', (req, res) => {
    dbManager.Course.delete(req.body.item)
        .then(function (result) {
            // console.log("Number of records inserted: " + result.affectedRows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    res.sendStatus(200);
});

app.post('/newitem', (req, res) => {
    dbManager.Assignment.create(
        uuid.v4(),
        req.session.userid,
        req.body.course,
        req.body.title,
        req.body.due,
        false,
        req.body.weight,
        0
    )
        .then(function (result) {
            // console.log("Number of records inserted: " + result.affectedRows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    res.sendStatus(200);
});

app.post('/login', (req, res) => {
    login.login(req, res);
});

app.post('/register', (req, res) => {
    register.register(req, res);
});

module.exports = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
