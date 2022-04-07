const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql')
const config = require('./config.json')

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

    var sql = "USE BTE;"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Database and table created");
    })

    sql = "CREATE TABLE IF NOT EXISTS assignments (id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(255), course VARCHAR(255), due DATE, done BOOLEAN);"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created/exists");
    })
})

// app.use(express.static(__dirname + '/html'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.get('/', (req, res) => {
    res.render('index', {assignments: assig})
})

app.post('/complete', (req, res) => {
    console.log(req.body);
    assig[req.body.item][3] = req.body.done;
    var sql = "UPDATE assignments SET done = ? WHERE id = ?"
    con.query(sql, [req.body.done, req.body.item], function(err, result) {
        if (err) throw err;
        console.log("Number updated: " + result.affectedRows)
    })
    res.sendStatus(200);
});

app.post('/newitem', (req, res) => {
    console.log(req.body);
    var sql = "INSERT INTO assignments (name, course, due, done) VALUES ?"
    con.query(sql, [[[req.body.title, req.body.course, req.body.due, false]]], function(err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    })
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})