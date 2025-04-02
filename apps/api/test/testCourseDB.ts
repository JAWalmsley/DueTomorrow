import assert = require('assert');
import { CourseDB, UserDB, courseData, userData } from "../dbManager";
import { Database } from "sqlite3";


describe('Course Database', function () {
    let courseDB = new CourseDB('testdb.db');
    let userDB = new UserDB('testdb.db');
    let testingCon = new Database('testdb.db');

    let testUser: userData = {
        id: 'testuserid',
        password: 'testpassword',
        username: 'testusername'
    }

    let testCourse: courseData = {
        id: 'testcourseID',
        colour: '#FFFFFF',
        credits: 3,
        name: 'test course name',
        userid: testUser.id
    }

    beforeEach(async function () {
        try {
            await courseDB.clearDB();
            await userDB.clearDB();
        }
        catch {
            // Table might not exist yet, run first test to setup table
            // Do nothing
        }
        await userDB.setUpTable();
        await userDB.create(testUser);
    });

    it('sets up table', function () {
        courseDB.setUpTable().then(() => {
            testingCon.get("SELECT name FROM sqlite_master WHERE type='table' AND name='courses';", function (e, r: { name }) {
                assert.equal(r.name, 'courses');
            });
        })

    });

    it('creates a course', function (done) {
        courseDB.setUpTable()
            .then(() => courseDB.create(testCourse))
            .then(() => testingCon.get("SELECT * FROM courses WHERE id = ?;", testCourse.id, function (e, r: { id: string, colour: string, credits: number }) {
                assert.equal(r.id, testCourse.id);
                assert.equal(r.colour, testCourse.colour);
                assert.equal(r.credits, testCourse.credits);
                done();
            }))
    });
})