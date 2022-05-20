const express = require('express')
const session = require('express-session');
const uuid = require("uuid");

const login = require("./login")
const register = require("./register")
const dbManager = require("./dbManager");

const config = require("./config.json")

const port = 3000

const app = express()

app.use(session({
    secret: config.jwtSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './views')
app.set('view engine', 'pug')

app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))

app.get('/', (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    let assig = dbManager.getAssignments(req.session.userid);
    let cour = dbManager.getCourses(req.session.userid);

    Promise.all([assig, cour])
        .then(function ([a, c]) {
            console.log(JSON.stringify(c));
            res.render('index', {username: req.session.username, assignments: a, courses: JSON.stringify(c)});
        }).catch((err) => {
        console.log(err)
    })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/courses', (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    dbManager.getCourses(req.session.userid)
        .then(function (result) {
                res.render('courses', {username: req.session.username, courses: result});
            }
        )
})

app.post('/complete', (req, res) => {
    console.log(req.body);
    dbManager.markComplete(req.body.done, req.body.item)
        .then(function (result) {
            // console.log("Number updated: " + result.affectedRows)
        }).catch((err) => {
        console.log(err);
    })
    res.sendStatus(200);
});

app.post('/deleteAssignment', (req, res) => {
    dbManager.deleteAssignment(req.body.item)
        .then(function (result) {
            // console.log("Number updated: " + result.affectedRows)
        }).catch((err) => {
            console.log(err);
    })
    res.sendStatus(200);
})

app.post('/newcourse', (req, res) => {
    dbManager.createCourse(req.session.userid, req.body.courseName, req.body.colour)
        .then(function (result) {
            // console.log("Number of records inserted: " + result.affectedRows);
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
    })
})

app.post('/deleteCourse', (req, res) => {
    dbManager.deleteCourse(req.body.item)
        .then(function (result) {
        // console.log("Number of records inserted: " + result.affectedRows);
    }).catch((err) => {
        console.log(err);
    })
    res.sendStatus(200);
})

app.post('/newitem', (req, res) => {
    console.log(req.body);
    dbManager.createAssignment(req.session.userid, req.body.title, req.body.course, req.body.due, false)
        .then(function (result) {
            // console.log("Number of records inserted: " + result.affectedRows);
        }).catch((err) => {
        console.log(err)
    })
    res.sendStatus(200);
})

app.post('/login', (req, res) => {
    login.login(req, res);
});


app.post('/register', (req, res) => {
    register.register(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})