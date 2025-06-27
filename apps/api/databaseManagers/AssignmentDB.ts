import { databaseFilename, DBManager } from "./dbManager";

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
        return this.makeReq('CREATE TABLE IF NOT EXISTS assignments (id VARCHAR(255) PRIMARY KEY, courseid VARCHAR(255), name VARCHAR(255), due DATE, weight INTEGER, FOREIGN KEY (courseid) REFERENCES courses(id) ON DELETE CASCADE);',
            []
        )
            .then(() => {
                return this.makeReq('CREATE TABLE IF NOT EXISTS userAssignmentStatus (userid VARCHAR(255), assignmentid VARCHAR(255), done BOOLEAN, grade INTEGER NULL, FOREIGN KEY (userid) REFERENCES logins(id) ON DELETE CASCADE, FOREIGN KEY (assignmentid) REFERENCES assignments(id) ON DELETE CASCADE, PRIMARY KEY (userid, assignmentid));',
                    []
                );
            });
    }

    create(data: assignmentData): Promise<any> {
        return this.makeReq(
            'INSERT INTO assignments (id, courseid, name, due, weight) VALUES (?, ?, ?, ?, ?)',
            [data.id, data.courseid, data.name, data.due, data.weight]
        )
            .then(() => {
                return this.makeReq(
                    'INSERT INTO userAssignmentStatus (userid, assignmentid, done, grade) VALUES (?, ?, ?, ?)',
                    [data.userid, data.id, data.done, data.grade]
                );
            });
    }

    getByID(id: string): Promise<null | assignmentData> {
        return this.makeReq('SELECT * FROM assignments WHERE id = ?', [id]).then(function (result) {
            return (result as assignmentData[])[0];
        });
    }

    getUserStatus(userid: string, assignmentid: string): Promise<{ done: boolean, grade: number | null }> {
        return this.makeReq('SELECT done, grade FROM userAssignmentStatus WHERE userid = ? AND assignmentid = ?', [userid, assignmentid])
            .then((result: { done: boolean, grade: number | null }[]) => {
                return result.length > 0 ? result[0] : { done: false, grade: null };
            });
    }

    getByUserID(userid: string): Promise<({editor: boolean;} & assignmentData)[]> {
        return this.makeReq("SELECT userCourses.editor as editor, assignments.id AS id,assignments.name AS name,assignments.due,assignments.weight,assignments.courseid,userAssignmentStatus.done,userAssignmentStatus.grade \
                FROM assignments JOIN userCourses ON userCourses.courseID = assignments.courseid\
                LEFT JOIN userAssignmentStatus ON userAssignmentStatus.assignmentid = assignments.id AND userAssignmentStatus.userid = ?\
                WHERE userCourses.userid = ?",
            [userid, userid]);
    }

    getByCourseID(courseid: string): Promise<{ id: string, courseid: string, name: string, due: Date, weight: number }[]> {
        return this.makeReq('SELECT * FROM assignments WHERE courseid = ?', [courseid]) as Promise<assignmentData[]>;
    }

    userCanEditAssignment(userid: string, assignmentid: string): Promise<boolean> {
        return this.makeReq('SELECT userCourses.editor FROM assignments, userCourses WHERE assignments.courseid = userCourses.courseid AND assignments.id = ? AND userCourses.userid = ?', [assignmentid, userid])
            .then((result: { editor: boolean }[]) => {
                return result.length > 0 ? result[0].editor : false;
            });
    }

    enrollUser(userid: string, assignmentid: string): Promise<any> {
        return this.makeReq('INSERT INTO userAssignmentStatus (userid, assignmentid, done, grade) VALUES (?, ?, ?, ?)', [userid, assignmentid, false, null]);
    }

    enrollUserInCourse(userid: string, courseid: string): Promise<any> {
        return this.makeReq('INSERT INTO userAssignmentStatus (userid, assignmentid, done, grade) SELECT ?, id, false, null FROM assignments WHERE courseid = ?', [userid, courseid])
    }

    setDoneStatus(userid: string, id: string, done: boolean): Promise<any> {
        return this.makeReq('INSERT INTO userAssignmentStatus (userid, assignmentid, done) VALUES (?, ?, ?) ON CONFLICT(userid, assignmentid) DO UPDATE SET done = ?', [userid, id, done, done]);
    }

    setGrade(userid: string, id: string, grade: number): Promise<any> {
        return this.makeReq(
            `INSERT INTO userAssignmentStatus (userid, assignmentid, grade)
             VALUES (?, ?, ?)
             ON CONFLICT(userid, assignmentid) DO UPDATE SET grade = ?`,
            [userid, id, grade, grade]
        );
    }

    setWeight(id: string, weight: number): Promise<any> {
        return this.makeReq(
            `INSERT INTO assignments (id, weight)
             VALUES (?, ?)
             ON CONFLICT(id) DO UPDATE SET weight = ?`,
            [id, weight, weight]
        );
    }

    deleteByID(id: string): Promise<any> {
        return this.makeReq('DELETE FROM assignments WHERE id = ?', [id]);
    }

    clearDB() {
        return this.makeReq('DELETE FROM assignments', []);
    }
}

export const assignmentDBInstance = new AssignmentDB(databaseFilename);