import assert = require('assert');
import { courseData, CourseDB } from '../databaseManagers/CourseDB';
import { Database } from "sqlite3";
import { userData, UserDB } from '../databaseManagers/UserDB';


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
    
    let testCourse2: courseData = {
        id: 'testcourseID2',
        colour: '#FF00FF',
        credits: 4,
        name: 'test course 2 name',
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
            .catch((e) => done(e));
    });

    it('gets a course', function(done) {
        courseDB.setUpTable()
        .then(() => courseDB.create(testCourse))
        .then(() => courseDB.getByID(testCourse.id))
        .then((response: (null | courseData)) => {
            assert.equal(response.id, testCourse.id);
            assert.equal(response.colour, testCourse.colour);
            done();
        })
        .catch((e) => done(e));
    })

    it('gets all a user\'s courses', function(done) {
        courseDB.setUpTable()
        .then(() => courseDB.create(testCourse))
        .then(() => courseDB.create(testCourse2))
        .then(() => courseDB.getByUserID(testCourse.userid))
        .then((response: courseData[]) => {
            assert.notEqual(response, null);
            assert.equal(response.length, 2);
            assert.equal(response.some((item) => item.id == testCourse.id), true);
            assert.equal(response.some((item) => item.id == testCourse2.id), true);
            done();
        })
        .catch((e) => done(e));
    })

    it('does not get a nonexistant course', function(done) {
        courseDB.setUpTable()
        .then(() => courseDB.getByID('doesntexist'))
        .then((response: (null | courseData)) => {
            assert.equal(response, null);
            done();
        })
        .catch((e) => done(e));
    })

    it('deletes a course', function(done) {
        courseDB.setUpTable()
        .then(() => courseDB.create(testCourse))
        .then(() => courseDB.deleteByID(testCourse.id))
        .then(() => testingCon.get("SELECT * FROM courses WHERE id = ?", testCourse.id, function(e, r: {}[]) {
            assert.equal(r, null);
            done();
        }))
        .catch((e) => done(e));
    })
})