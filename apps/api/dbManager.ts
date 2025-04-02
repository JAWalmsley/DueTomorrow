const mysql = require('mysql2');
var hash = require('object-hash');
import { Database } from "sqlite3";

export interface userData {
    // UUID V4 format ID
    id: string;
    username: string;
    password: string;
}

export interface courseData {
    id: string;
    userid: string;
    name: string;
    colour: string;
    credits: number;
}

interface assignmentData {
    id: string;
    userid: string;
    courseid: string;
    name: string;
    due: Date;
    done: boolean;
    weight: number;
    grade: number | null;
}

interface sharecodeData {
    code: string;
    courseid: string;
}

interface notificationData {
    hash: string;
    userid: string;
    endpoint: string;
    p256dh: string;
    auth: string;
}

class DBManager {
    db: Database;
    constructor(filename: string)
    {
        this.db = new Database(filename);
    }

    makeReq (cmd: string, vals: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all(cmd, vals, function (err: string, result: any) {
                if (err) reject(err);
                resolve(result);
            });
        });
    };
}

export class UserDB extends DBManager {
    setUpTable()
    {
        return this.makeReq(
            'CREATE TABLE IF NOT EXISTS logins (id VARCHAR(255) PRIMARY KEY, username VARCHAR(255), password VARCHAR(255));',
            []
        );
    }
    
    /**
     * Create a user
     * @returns {Promise} mySQL query Promise
     */
    create(data: userData): Promise<any> {
        return this.makeReq( 
            'INSERT INTO logins (id, username, password) VALUES (?, ?, ?)',
            [data.id, data.username, data.password]
        );
    }

    /**
     * Gets a user by username
     * @param {string} username - The username to search by
     * @returns {Promise<userData>} The first result in the results (should be the only result)
     */
    getByUsername(username): Promise<userData> {
        return this.makeReq('SELECT * FROM logins WHERE username = ?', [
            username,
        ]).then(function (result) {
            return (result as userData[])[0];
        });
    }

    /**
     * Gets all users in the database
     * @returns all users
     */
    getAll(): Promise<userData[]> {
        return this.makeReq('SELECT * FROM logins', []) as Promise<userData[]>;
    }

    /**
     * Gets a user by userid
     * @param {string} userid - The userid to search by
     * @returns {Promise<Object>} The first result in the results (should be the only result)
     */
    getByUserID(userid): Promise<null | userData> {
        return this.makeReq('SELECT * FROM logins WHERE id = ?', [
            userid,
        ]).then(function (result) {
            return (result as userData[])[0];
        });
    }

    /**
     * Updates a user
     * @param userid - The id to update
     * @param newpass - The new password to replace
     */
    setPassword(id, newpass): Promise<any> {
        return this.makeReq('UPDATE logins SET password = ? WHERE id = ?', [
            newpass, id
        ]).then((res) => {
            return res;
        })
    }

    clearDB()
    {
        return this.makeReq('DELETE FROM logins', []);
    }
};

export class CourseDB extends DBManager {
    setUpTable()
    {
        return this.makeReq(
            'CREATE TABLE IF NOT EXISTS courses (id VARCHAR(255) PRIMARY KEY, userid VARCHAR(255), name VARCHAR(255), colour VARCHAR(7), credits INTEGER, FOREIGN KEY (userid) REFERENCES logins(id) ON DELETE CASCADE);',
            []
        );
    }

    create(data: courseData): Promise<any> {
        return this.makeReq(
            'INSERT INTO courses (id, userid, name, colour, credits) VALUES (?, ?, ?, ?, ?)',
            [data.id, data.userid, data.name, data.colour, data.credits]
        );
    }

    getByUserID(userid: string): Promise<courseData[]> {
        return this.makeReq('SELECT * FROM courses WHERE userid = ?', [userid]) as Promise<courseData[]>;
    }

    getByID(id: string): Promise<courseData> {
        return this.makeReq('SELECT * FROM courses WHERE id = ?', [id]) as Promise<courseData>;
    }

    clearDB()
    {
        return this.makeReq('DELETE FROM courses', []);
    }
}