import { DBManager } from "./dbManager";

export interface assignmentData {
    id: string;
    userid: string;
    courseid: string;
    name: string;
    due: Date;
    done: boolean;
    weight: number;
    grade: number | null;
}

export class AssignmentDB extends DBManager {
    setUpTable(): Promise<any> {
        return this.makeReq('CREATE TABLE IF NOT EXISTS assignments (id VARCHAR(255) PRIMARY KEY, userid VARCHAR(255), courseid VARCHAR(255), name VARCHAR(255),  due DATE, done BOOLEAN, weight INTEGER, grade INTEGER NULL, FOREIGN KEY (userid) REFERENCES logins(id) ON DELETE CASCADE, FOREIGN KEY (courseid) REFERENCES courses(id) ON DELETE CASCADE);', 
            []
        );
    }

    create(data: assignmentData): Promise<any> {
        return this.makeReq(
            'INSERT INTO assignments (id, userid, courseid, name, due, done, weight, grade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [data.id, data.userid, data.courseid, data.name, data.due.toISOString(), data.done, data.weight, data.grade]
        );
    }

    getByID(id: string): Promise<null | assignmentData> {
        return this.makeReq('SELECT * FROM assignments WHERE id = ?', [id]) .then(function (result) {
            return (result as assignmentData[])[0];
        });;
    }

    getByUserID(userid: string): Promise<assignmentData[]> {
        return this.makeReq('SELECT * FROM assignments WHERE userid = ? ORDER BY done, due, weight DESC', [userid]) as Promise<assignmentData[]>;
    }

    getByCourseID(courseid: string) : Promise<assignmentData[]> {
        return this.makeReq('SELECT * FROM assignments WHERE courseid = ?', [courseid]) as Promise<assignmentData[]>;
    }

    setDoneStatus(id: string, done: boolean): Promise<any> {
        return this.makeReq('UPDATE assignments SET done = ? WHERE id = ?', [done, id]);
    }

    setGrade(id: string, grade: number): Promise<any> {
        return this.makeReq('UPDATE assignments SET grade = ? WHERE id = ?', [grade, id]);
    }

    setWeight(id: string, weight: number): Promise<any> {
        return this.makeReq('UPDATE assignments SET weight = ? WHERE id = ?', [weight, id]);
    }

    deleteByID(id: string): Promise<any> {
        return this.makeReq('DELETE FROM assignments WHERE id = ?', [id]);
    }

    clearDB() {
        return this.makeReq('DELETE FROM assignments', []);
    }
}