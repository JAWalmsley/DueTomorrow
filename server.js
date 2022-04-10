const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql')
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
    dbManager.makeReq("select * from assignments order by done, due", [], function (result) {
        res.render('index', {assignments: result})
    })

})

app.post('/complete', (req, res) => {
    console.log(req.body);
    dbManager.makeReq("UPDATE assignments SET done = ? WHERE id = ?", [req.body.done, req.body.item], function (result) {
        console.log("Number updated: " + result.affectedRows)
    })
    res.sendStatus(200);
});

app.post('/newitem', (req, res) => {
    console.log(req.body);
    dbManager.makeReq("INSERT INTO assignments (id, userid, name, course, due, done) VALUES ?",
        [[[uuid.v4(), "8d3d39ed-7569-465f-a6b7-153d115f29ed", req.body.title, req.body.course, req.body.due, false]]],
        function (result) {
            console.log("Number of records inserted: " + result.affectedRows);
        })
    res.sendStatus(200);
})

app.post('/login', (req, res) => {
    console.log(req.body)
    const {username, password} = req.body;
    if (!username || !password) {
        callback(res.status(400))
    }
    dbManager.makeReq("SELECT * FROM logins WHERE username = ?", [username], function (result) {
        let user = result[0];
        bcrypt.compare(password, user.password).then(function (result) {
            res.sendStatus(200)
            console.log("done")
        })
    })
});
app.post('/register', (req, res) => register.register(req, res, res.sendStatus));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})