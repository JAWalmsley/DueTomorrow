const mysql = require('mysql2');
var hash = require('object-hash');
import { Database } from "sqlite3";

export const databaseFilename = "database.db"

export class DBManager {
    db: Database;
    constructor(filename: string) {
        this.db = new Database(filename);
        this.db.run("PRAGMA foreign_keys = ON")
    }

    makeReq(cmd: string, vals: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all(cmd, vals, function (err: string, result: any) {
                if (err) reject(err);
                resolve(result);
            });
        });
    };
}
