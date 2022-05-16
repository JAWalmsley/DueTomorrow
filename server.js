const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2')
const config = require('./config.json')
const uuid = require("uuid");

const login = require("./login")
const register = require("./register")
const dbManager = require("./dbManager");
const bcrypt = require("bcryptjs");

const app = express()
app.use(bodyparser.json())
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))

app.get('/', (req, res) => {
    let assig = ['no', 'bad', '2020-09-30', false]
    dbManager.getAssignments("85dc03ce-426e-4263-9087-8044eed8da62")
        .then(function (result) {
            res.render('index', {assignments: result})
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

app.post('/complete', (req, res) => {
    console.log(req.body);
    dbManager.markComplete(req.body.done, req.body.item)
        .then(function (result) {
            console.log("Number updated: " + result.affectedRows)
        }).catch((err) => {
        console.log(err)
    })
    res.sendStatus(200);
});

app.post('/newitem', (req, res) => {
    console.log(req.body);
    dbManager.createAssignment(uuid.v4(), "85dc03ce-426e-4263-9087-8044eed8da62", req.body.title, req.body.course, req.body.due, false)
        .then(function (result) {
            console.log("Number of records inserted: " + result.affectedRows);
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