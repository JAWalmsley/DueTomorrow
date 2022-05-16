const mysql = require("mysql");
const config = require("./config.json");
const uuid = require("uuid");

let con = mysql.createConnection({
    host: 'localhost', user: config.username, password: config.password
})

con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!")

    con.query("CREATE DATABASE IF NOT EXISTS BTE;", function (err, result) {
        if (err) throw err;
    })

    con.query("USE BTE;", function (err, result) {
        if (err) throw err;
        // console.log("Database connected");
    })

    con.query("CREATE TABLE IF NOT EXISTS logins (userid VARCHAR(255) primary key, username VARCHAR(255), password VARCHAR(255));", function (err, result) {
        if (err) throw err;
        // console.log("Login table created/exists");
    })

    con.query("CREATE TABLE IF NOT EXISTS courses (userid VARCHAR(255), course VARCHAR(255), FOREIGN KEY (userid) REFERENCES logins(userid));\n", function (err, result) {
        if (err) throw err;
        // console.log("Courses table created/exists");
    })

    con.query("CREATE TABLE IF NOT EXISTS assignments (userid VARCHAR(255), id VARCHAR(255) PRIMARY KEY,  name VARCHAR(255), course VARCHAR(255), due DATE, done BOOLEAN, FOREIGN KEY (userid) REFERENCES logins(userid));", function (err, result) {
        if (err) throw err;
        // console.log("Assignment table created/exists");
    })
})

con.query("USE BTE;", function (err, result) {
    if (err) throw err;
    console.log("Database connected");
})

makeReq = function (cmd, vals) {
    return new Promise((resolve, reject) => {
        con.query(cmd, vals, function (err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

exports.getAssignments = function (userid) {
    return makeReq("select * from assignments where userid = ? order by done, due", [userid]);
}

exports.markComplete = function (done, assignmentID) {
    return makeReq("UPDATE assignments SET done = ? WHERE id = ?", [done, assignmentID]);
}

exports.createAssignment = function (id, userid, name, course, due, done) {
    return makeReq("INSERT INTO assignments (id, userid, name, course, due, done) VALUES (?)", [[id, userid, name, course, due, done]]);
}

exports.getUser = function (username) {
    return makeReq("SELECT * FROM logins WHERE username = ?", [username]);
}

exports.createUser = function (username, hash) {
    return makeReq("INSERT INTO logins (userid, username, password) VALUES (?)", [[uuid.v4(), username, hash]]);
}

