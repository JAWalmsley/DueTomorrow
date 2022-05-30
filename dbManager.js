const mysql = require('mysql');
const config = require('./config.json');

let con = mysql.createConnection({
    host: 'localhost',
    user: config.username,
    password: config.password,
});

con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!")
});

// con.query("USE BTE;", function (err, result) {
//     if (err) throw err;
//     console.log("Database connected");
// })

makeReq = function (cmd, vals) {
    return new Promise((resolve, reject) => {
        con.query(cmd, vals, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// SET UP
let dbName = config.database;

// This string substitution is horrible, but dbName isn't user facing and shouldn't be injectable so we good?
// If you use the sql ? substitution it'll add quotes around the db name and that doesn't work for this command
con.query(
    'CREATE DATABASE IF NOT EXISTS ?;'.replace('?', dbName),
    function (err, result) {
        if (err) throw err;
    }
);
con.query('USE ?;'.replace('?', dbName), function (err, result) {
    if (err) throw err;
    // console.log("Database connected");
});

con.query(
    'CREATE TABLE IF NOT EXISTS logins (id VARCHAR(255) PRIMARY KEY, username VARCHAR(255), password VARCHAR(255));',
    function (err, result) {
        if (err) throw err;
        // console.log("Login table created/exists");
    }
);

con.query(
    'CREATE TABLE IF NOT EXISTS courses (id VARCHAR(255) PRIMARY KEY, userid VARCHAR(255), name VARCHAR(255), colour VARCHAR(7), credits INTEGER, FOREIGN KEY (userid) REFERENCES logins(id) ON DELETE CASCADE);',
    function (err, result) {
        if (err) throw err;
        // console.log("Courses table created/exists");
    }
);

con.query(
    'CREATE TABLE IF NOT EXISTS assignments (id VARCHAR(255) PRIMARY KEY, userid VARCHAR(255), courseid VARCHAR(255), name VARCHAR(255),  due DATE, done BOOLEAN, weight INTEGER, grade INTEGER, FOREIGN KEY (userid) REFERENCES logins(id) ON DELETE CASCADE, FOREIGN KEY (courseid) REFERENCES courses(id) ON DELETE CASCADE);',
    function (err, result) {
        if (err) throw err;
        // console.log("Assignment table created/exists");
    }
);

exports.User = class {
    /** 
    * Create a user
    * @param {String} id - User'd UUID (use uuid.v4())
    * @param {String} username - User's username
    * @param {String} password - Hash of user's password
    * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
    */
    static create(id, username, password) {
        return makeReq(
            'INSERT INTO logins (id, username, password) VALUES (?)',
            [id, username, password]
        );
    }

    static getByUsername(username) {
        return makeReq('SELECT * FROM logins WHERE username = ?', [
            username,
        ]).then(function (result) {
            return result[0];
        });
    }
};

exports.Course = class {
    static create(id, userid, name, colour, credits) {
        return makeReq(
            'INSERT INTO courses (id, userid, name, colour, credits) VALUES (?)',
            [id, userid, name, colour, credits]
        );
    }

    static getByUserID(userid) {
        return makeReq('SELECT * FROM courses WHERE userid = ?', [userid]);
    }

    static delete(id) {
        return makeReq('DELETE FROM courses WHERE id = ?', [id]);
    }
};

exports.Assignment = class {
    static create(id, userid, courseid, name, due, done, weight, grade) {
        return makeReq(
            'INSERT INTO assignments (id, userid, courseid, name, due, done, weight, grade) VALUES (?)',
            [id, userid, courseid, name, due, done, weight, grade]
        );
    }

    static getByUserID(userID) {
        return makeReq('SELECT * FROM assignments WHERE userid = ?', [userID]);
    }

    static delete(id) {
        return makeReq('DELETE FROM assignments WHERE id = ?', [id]);
    }
};

exports.clearDb = function () {
    let assignments = makeReq('DELETE FROM assignments');
    let courses = makeReq('DELETE FROM courses');
    let logins = makeReq('DELETE FROM logins');

    return Promise.all([logins, courses, assignments]);
};
