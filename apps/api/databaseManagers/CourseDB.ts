import { databaseFilename, DBManager } from "./dbManager";

export interface courseData {
    id: string;
    name: string;
    colour: string;
    credits: number;
}

export class CourseDB extends DBManager {
    setUpTable() {
        return this.makeReq(
            'CREATE TABLE IF NOT EXISTS courses (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), colour VARCHAR(7), credits INTEGER);',
            []
        )
            .then(() => {
                this.makeReq('CREATE TABLE IF NOT EXISTS userCourses (courseID VARCHAR(255), userid VARCHAR(255), editor BOOLEAN NOT NULL CHECK (editor IN (0, 1)), PRIMARY KEY (courseID, userid), FOREIGN KEY (courseID) REFERENCES courses(id) ON DELETE CASCADE, FOREIGN KEY (userid) REFERENCES logins(id) ON DELETE CASCADE);',
                    []
                );
            }
            );
    }

    create(data: courseData, userid: string): Promise<any> {
        return this.makeReq(
            'INSERT INTO courses (id, name, colour, credits) VALUES (?, ?, ?, ?)',
            [data.id, data.name, data.colour, data.credits]
        )
        .then(() => {
            return this.enrollUser(userid, data.id, true);
        });
    }

    getByUserID(userid: string): Promise<({editor: boolean} & courseData)[]> {
        return this.makeReq('SELECT userCourses.editor, courses.id, courses.name, courses.colour, courses.credits FROM courses JOIN userCourses ON courses.id = userCourses.courseid WHERE userCourses.userid = ?', [userid]);
    }

    getByID(id: string): Promise<null | courseData> {
        return this.makeReq('SELECT * FROM courses WHERE id = ?', [id])
            .then(function (result) {
                return (result as courseData[])[0];
            });
    }

    userCanEditCourse(userid: string, courseid: string): Promise<boolean> {
        return this.makeReq('SELECT editor FROM userCourses WHERE userid = ? AND courseID = ?', [userid, courseid])
            .then(function (result) {
                return (result as any[]).length > 0 ? (result[0].editor === 1) : false;
            });
    }

    enrollUser(userid: string, courseid: string, editor: boolean): Promise<any> {
        return this.makeReq('INSERT INTO userCourses (courseID, userid, editor) VALUES (?, ?, ?)', [courseid, userid, editor])
            .catch((err) => {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    throw new Error('Already enrolled in course');
                } else {
                    throw err;
                }
            });
    }

    unenrollUser(userid: string, courseid: string): Promise<any> {
        // TODO: some system to delete courses that have no users enrolled
        return this.makeReq('DELETE FROM userCourses WHERE userid = ? AND courseID = ?', [userid, courseid])
            .catch((err) => {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    throw new Error('Not enrolled in course');
                } else {
                    throw err;
                }
            });
    }

    deleteByID(id: string): Promise<any> {
        return this.makeReq('DELETE FROM courses WHERE id = ?', [id]);
    }

    clearDB() {
        return this.makeReq('DELETE FROM courses', []);
    }
}

export const courseDBInstance = new CourseDB(databaseFilename);
