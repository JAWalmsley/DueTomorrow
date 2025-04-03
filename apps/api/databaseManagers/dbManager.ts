const mysql = require('mysql2');
var hash = require('object-hash');
import { Database } from "sqlite3";

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

export class DBManager {
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
