const mysql = require("mysql");
const config = require("./config.json");

let con = mysql.createConnection({
    host: 'localhost',
    user: config.username,
    password: config.password
})

con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!")

    con.query("USE BTE;", function (err, result) {
        if (err) throw err;
        // console.log("Database connected");
    })

    con.query("CREATE TABLE IF NOT EXISTS logins (userid VARCHAR(255) primary key, username VARCHAR(255), password VARCHAR(255));",
        function (err, result) {
            if (err) throw err;
            // console.log("Login table created/exists");
        })

    con.query("CREATE TABLE IF NOT EXISTS courses (userid VARCHAR(255), course VARCHAR(255), FOREIGN KEY (userid) REFERENCES logins(userid));\n",
        function (err, result) {
            if (err) throw err;
            // console.log("Courses table created/exists");
        })

    con.query("CREATE TABLE IF NOT EXISTS assignments (userid VARCHAR(255), id VARCHAR(255) PRIMARY KEY,  name VARCHAR(255), course VARCHAR(255), due DATE, done BOOLEAN, FOREIGN KEY (userid) REFERENCES logins(userid));",
        function (err, result) {
            if (err) throw err;
            // console.log("Assignment table created/exists");
        })
})

con.query("USE BTE;", function (err, result) {
    if (err) throw err;
    console.log("Database connected");
})

exports.makeReq = function(cmd, vals, callback) {
    con.query(cmd, vals, function (err, result) {
        if (err) throw err;
        callback(result);
    })
}