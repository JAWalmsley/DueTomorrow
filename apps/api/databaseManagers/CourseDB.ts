import { DBManager } from "./dbManager";

export interface courseData {
    id: string;
    userid: string;
    name: string;
    colour: string;
    credits: number;
}

export class CourseDB extends DBManager {
    setUpTable() {
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

    getByID(id: string): Promise<null | courseData> {
        return this.makeReq('SELECT * FROM courses WHERE id = ?', [id])
            .then(function (result) {
                return (result as courseData[])[0];
            });
    }

    deleteByID(id: string): Promise<any> {
        return this.makeReq('DELETE FROM courses WHERE id = ?', [id]);
    }

    clearDB() {
        return this.makeReq('DELETE FROM courses', []);
    }
}
