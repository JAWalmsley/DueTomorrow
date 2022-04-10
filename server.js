const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql')
const config = require('./config.json')
const uuid = require("uuid");

const app = express()
app.use(bodyparser.json())
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

let con = mysql.createConnection({
    host: 'localhost',
    user: config.username,
    password: config.password
})

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!")

    con.query("USE BTE;", function (err, result) {
        if (err) throw err;
        console.log("Database connected");
    })

    con.query("CREATE TABLE IF NOT EXISTS logins (userid VARCHAR(255) primary key, username VARCHAR(255), password VARCHAR(255));",
        function (err, result) {
            if (err) throw err;
            console.log("Login table created/exists");
        })

    con.query("CREATE TABLE IF NOT EXISTS courses (userid VARCHAR(255), course VARCHAR(255), FOREIGN KEY (userid) REFERENCES logins(userid));\n",
        function (err, result) {
            if (err) throw err;
            console.log("Courses table created/exists");
        })

    con.query("CREATE TABLE IF NOT EXISTS assignments (userid VARCHAR(255), id VARCHAR(255) PRIMARY KEY,  name VARCHAR(255), course VARCHAR(255), due DATE, done BOOLEAN, FOREIGN KEY (userid) REFERENCES logins(userid));",
        function (err, result) {
            if (err) throw err;
            console.log("Assignment table created/exists");
        })
})

// app.use(express.static(__dirname + '/html'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.get('/', (req, res) => {
    let assig = ['no', 'bad', '2020-09-30', false]
    con.query('select * from assignments order by done, due', function (err, result) {
        if (err) {
            res.sendStatus(500);
            throw err;
        } else {
            assig = result
            res.render('index', {assignments: assig})
        }
    })

})

app.post('/complete', (req, res) => {
    console.log(req.body);
    con.query("UPDATE assignments SET done = ? WHERE id = ?", [req.body.done, req.body.item], function (err, result) {
        if (err) throw err;
        console.log("Number updated: " + result.affectedRows)
    })
    res.sendStatus(200);
});

app.post('/newitem', (req, res) => {
    console.log(req.body);
    con.query("INSERT INTO assignments (id, userid, name, course, due, done) VALUES ?",
        [[[uuid.v4(), "8d3d39ed-7569-465f-a6b7-153d115f29ed", req.body.title, req.body.course, req.body.due, false]]],
        function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        })
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})