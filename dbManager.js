const mysql = require('mysql2');
const config = require('./config.json');

let con = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: config.username,
    password: config.password,
    database: config.database
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
     * @returns {Promise} mySQL query Promise
     */
    static create(id, username, password) {
        return makeReq(
            'INSERT INTO logins (id, username, password) VALUES (?)',
            [[id, username, password]]
        );
    }

    /**
     * Gets a user by username
     * @param {String} username - The username to search by
     * @returns {Promise<Object>} The first result in the results (should be the only result)
     */
    static getByUsername(username) {
        return makeReq('SELECT * FROM logins WHERE username = ?', [
            username,
        ]).then(function (result) {
            return result[0];
        });
    }

    /**
     * Gets a user by userid
     * @param {String} userid - The userid to search by
     * @returns {Promise<Object>} The first result in the results (should be the only result)
     */
    static getByUserID(userid) {
        return makeReq('SELECT * FROM logins WHERE id = ?', [
            userid,
        ]).then(function(result) {
            return result[0];
        })
    }

    /**
     * Updates a user
     * @param userid - The id to update
     * @param data - The new data to replace
     */
    static update(userid, data) {
        return makeReq('UPDATE logins SET ? WHERE id = ?', [
            data, userid
        ])
    }
};

exports.Course = class {
    /**
     * Create a course
     * @param {String} id - The id of the course
     * @param {String} userid - The id of the user this course belongs to
     * @param {String} name - The name of the course
     * @param {String} colour - The colour of the course
     * @param {Int} credits - The amount of credits this course is worth
     * @returns {Promise} mySQL query Promise
     */
    static create(id, userid, name, colour, credits) {
        return makeReq(
            'INSERT INTO courses (id, userid, name, colour, credits) VALUES (?)',
            [[id, userid, name, colour, credits]]
        );
    }

    /**
     * Gets all courses belonging to a user
     * @param {String} userid - The id to search by
     * @returns {Promise} mySQL query Promise
     */
    static getByUserID(userid) {
        return makeReq('SELECT * FROM courses WHERE userid = ?', [userid]);
    }

    /**
     * Delete a given course
     * @param {String} id - The id of the course to delete
     * @returns {Promise} mySQL query Promise
     */
    static delete(id) {
        return makeReq('DELETE FROM courses WHERE id = ?', [id]);
    }
};

exports.Assignment = class {
    /**
     * Create an assignment
     * @param {String} id
     * @param {String} userid
     * @param {String} courseid
     * @param {String} name
     * @param {String} due
     * @param {Boolean} done
     * @param {Int} weight
     * @param {Int} grade
     * @returns {Promise} mySQL query Promise
     */
    static create(id, userid, courseid, name, due, done, weight, grade) {
        return makeReq(
            'INSERT INTO assignments (id, userid, courseid, name, due, done, weight, grade) VALUES (?)',
            [[id, userid, courseid, name, due, done, weight, grade]]
        );
    }

    /**
     * Get all assignments owned by given user
     * @param {String} userID
     * @returns {Promise} mySQL query Promise
     */
    static getByUserID(userID) {
        return makeReq('SELECT * FROM assignments WHERE userid = ? ORDER BY done, due, weight DESC', [userID]);
    }

    /**
     * Set the complete status of an assignment
     * @param {String} id 
     * @param {Boolean} done 
     * @returns {Promise} mySQL query Promise
     */
    static setComplete(id, done) {
        return makeReq('UPDATE assignments SET done = ? WHERE id = ?', [done, id]);
    }

    /**
     * Sets the grade of an assignment
     * @param {String} id
     * @param {Int} grade
     * @returns {Promise} mySQL query Promise
     */
    static setGrade(id, grade) {
        return makeReq('UPDATE assignments SET grade = ? WHERE id = ?', [grade, id]);
    }

    /**
     * Delete an assignment
     * @param {String} id 
     * @returns {Promise} mySQL query Promise
     */
    static delete(id) {
        return makeReq('DELETE FROM assignments WHERE id = ?', [id]);
    }
};

/**
 * Clears all tables in DB
 * @returns {Promise} mySQL query Promise
 */
exports.clearDb = function () {
    let assignments = makeReq('DELETE FROM assignments');
    let courses = makeReq('DELETE FROM courses');
    let logins = makeReq('DELETE FROM logins');

    return Promise.all([logins, courses, assignments]);
};
