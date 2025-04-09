import assert = require('assert');
import { courseData, CourseDB } from '../databaseManagers/CourseDB';
import { sharecodeData, SharecodeDB } from '../databaseManagers/SharecodeDB';
import { userData, UserDB } from '../databaseManagers/UserDB';
import { Database } from 'sqlite3';

describe('Sharecode Database', function () {
    let courseDB = new CourseDB('testdb.db');
    let sharecodeDB = new SharecodeDB('testdb.db');
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

    let testCourse2: courseData = {
        id: 'testcourseID2',
        colour: '#FF00FF',
        credits: 4,
        name: 'test course 2 name',
        userid: testUser.id
    }

    let testSharecode: sharecodeData = {
        code: 'testsharecode',
        courseids: [testCourse.id, testCourse2.id]
    }

    beforeEach(async function () {
        try {
            await userDB.clearDB();
            await courseDB.clearDB();
            await sharecodeDB.clearDB();
        }
        catch {
            // Table might not exist yet, run first test to setup table
            // Do nothing
        }
        await userDB.setUpTable();
        await userDB.create(testUser);
        await courseDB.setUpTable();
        await courseDB.create(testCourse);
    });

    it('sets up table', function (done) {
        sharecodeDB.setUpTable()
            .then(() => testingCon.get("SELECT name FROM sqlite_master WHERE type='table' AND name='sharecodes'", function (e, r: { name }) {
                assert.equal(r.name, 'sharecodes');
                done();
            }))
            .catch((e) => done(e));

    });

    it('creates a sharecode', function (done) {
        sharecodeDB.setUpTable()
            .then(() => sharecodeDB.create(testSharecode))
            .then((r) => console.log("thing is", r))
            .then(() => testingCon.all("SELECT * FROM sharecodes WHERE code = ?", testSharecode.code, function (e, r: { courseid: string }[]) {
                assert.notEqual(r, null);
                assert.equal(r.length, 2);
                assert.equal(r.some((item) => item.courseid == testCourse.id), true)
                assert.equal(r.some((item) => item.courseid == testCourse.id), true);
                done();
            }))
            .catch((e) => done(e));
    });

    it('does not say a fake code exists', function (done) {
        sharecodeDB.setUpTable()
            .then(() => sharecodeDB.codeExists(testSharecode.code))
            .then((response) => assert.equal(response, false))
            .then(() => done())
            .catch((e) => done(e));
    });

    it('says an existing code exists', function (done) {
        sharecodeDB.setUpTable()
            .then(() => sharecodeDB.create(testSharecode))
            .then(() => sharecodeDB.codeExists(testSharecode.code))
            .then((response) => assert.equal(response, true))
            .then(() => done())
            .catch((e) => done(e));
    });

    it('gets all the courses linked to a sharecode', function (done) {
        sharecodeDB.setUpTable()
            .then(() => sharecodeDB.create(testSharecode))
            .then(() => sharecodeDB.getByCode(testSharecode.code))
            .then((response: sharecodeData) => {
                assert.notEqual(response, null);
                assert.equal(response.code, testSharecode.code);
                assert.deepStrictEqual(response.courseids, testSharecode.courseids);
            })
            .catch((e) => done(e));
    })
})