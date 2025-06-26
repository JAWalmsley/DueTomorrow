import assert = require("assert");
import { assignmentData, AssignmentDB } from "../databaseManagers/AssignmentDB";
import { courseData, CourseDB } from "../databaseManagers/CourseDB";
import { userData, UserDB } from "../databaseManagers/UserDB";
import { Database } from "sqlite3";

describe('Assignment Database', function () {
    let assignmentDB = new AssignmentDB('testdb.db');
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
    }

    let testAssignment: assignmentData = {
        id: 'testassignmentid',
        courseid: testCourse.id,
        done: false,
        due: new Date(),
        grade: null,
        name: 'assignment name',
        userid: testUser.id,
        weight: 50
    }

    let testAssignment2: assignmentData = {
        id: 'testassignmentid2',
        courseid: testCourse.id,
        done: true,
        due: new Date(),
        grade: 20,
        name: 'assignment name 2',
        userid: testUser.id,
        weight: 55
    }

    beforeEach(async function () {
        try {
            await userDB.clearDB();
            await courseDB.clearDB();
            await assignmentDB.clearDB();
        }
        catch {
            // Table might not exist yet, run first test to setup table
            // Do nothing
        }
        await userDB.setUpTable();
        await userDB.create(testUser);
        await courseDB.setUpTable();
        await courseDB.create(testCourse, testUser.id);
    });

    it('sets up table', function () {
        assignmentDB.setUpTable()
            .then(() => testingCon.get("SELECT name FROM sqlite_master WHERE type='table' AND name='assignments';", function (e, r: { name }) {
                assert.equal(r.name, 'assignments');
            }));
    });

    it('creates an assignment', function (done) {
        assignmentDB.setUpTable()
            .then(() => assignmentDB.create(testAssignment))
            .then(() => testingCon.get("SELECT * FROM assignments WHERE id = ?;", testAssignment.id, function (e, r: assignmentData) {
                assert.equal(r.id, testAssignment.id);
                assert.equal(r.done, testAssignment.done);
                assert.equal(r.grade, testAssignment.grade);
                assert.equal(r.weight, testAssignment.weight);
                done();
            }))
            .catch((e) => done(e));
    });

    it('gets an assignment', function (done) {
        assignmentDB.setUpTable()
            .then(() => assignmentDB.create(testAssignment))
            .then(() => assignmentDB.getByID(testAssignment.id))
            .then((response) => {
                assert.equal(response.id, testAssignment.id);
                assert.equal(response.done, testAssignment.done);
                assert.equal(response.courseid, testAssignment.courseid);
                assert.equal(response.grade, testAssignment.grade);
                assert.equal(response.name, testAssignment.name);
                assert.equal(response.weight, testAssignment.weight);
                done();
            })
            .catch((e) => done(e));
    });

    it('does not get a nonexistant assignment', function (done) {
        assignmentDB.setUpTable()
            .then(() => assignmentDB.getByID('doesntexist'))
            .then((response) => {
                assert.equal(response, null);
                done();
            })
            .catch((e) => done(e));
    });

    it('deletes an assignment', function (done) {
        assignmentDB.setUpTable()
            .then(() => assignmentDB.create(testAssignment))
            .then(() => assignmentDB.deleteByID(testAssignment.id))
            .then(() => testingCon.get("SELECT * FROM assignments WHERE id = ?", testCourse.id, function (e, r: {}[]) {
                assert.equal(r, null);
                done();
            }))
            .catch((e) => done(e));
    });

    it('gets all a user\'s assignments', function (done) {
        assignmentDB.setUpTable()
            .then(() => assignmentDB.create(testAssignment))
            .then(() => assignmentDB.create(testAssignment2))
            .then(() => assignmentDB.getByUserID(testAssignment.userid))
            .then((response) => {
                assert.notEqual(response, null);
                assert.equal(response.length, 2);
                assert.equal(response.some((item) => item.id == testAssignment.id), true);
                assert.equal(response.some((item) => item.id == testAssignment2.id), true);
                done();
            })
            .catch((e) => done(e));
    });

    it('gets all a course\'s assignments', function (done) {
        assignmentDB.setUpTable()
            .then(() => assignmentDB.create(testAssignment))
            .then(() => assignmentDB.create(testAssignment2))
            .then(() => assignmentDB.getByCourseID(testAssignment.courseid))
            .then((response) => {
                assert.notEqual(response, null);
                assert.equal(response.length, 2);
                assert.equal(response.some((item) => item.id == testAssignment.id), true);
                assert.equal(response.some((item) => item.id == testAssignment2.id), true);
                done();
            })
            .catch((e) => done(e));
    });

    it('marks an assignment as done', function (done) {
        assignmentDB.setUpTable()
            .then(() => assignmentDB.create(testAssignment))
            .then(() => assignmentDB.setDoneStatus(testAssignment.id, true))
            .then(() => assignmentDB.getByID(testAssignment.id))
            .then((response) => {
                assert.equal(response.done, true);
            })
            .then(() => assignmentDB.setDoneStatus(testAssignment.id, false))
            .then(() => assignmentDB.getByID(testAssignment.id))
            .then((response) => {
                assert.equal(response.done, false);
            })
            .then(() => done())
            .catch((e) => done(e));
    });

    it('sets an assignment grade', function (done) {
        assignmentDB.setUpTable()
            .then(() => assignmentDB.create(testAssignment))
            .then(() => assignmentDB.setGrade(testAssignment.id, 19))
            .then(() => assignmentDB.getByID(testAssignment.id))
            .then((response) => {
                assert.equal(response.grade, 19);
            })
            .then(() => assignmentDB.setGrade(testAssignment.id, 95))
            .then(() => assignmentDB.getByID(testAssignment.id))
            .then((response) => {
                assert.equal(response.grade, 95);
            })
            .then(() => assignmentDB.setGrade(testAssignment.id, null))
            .then(() => assignmentDB.getByID(testAssignment.id))
            .then((response) => {
                assert.equal(response.grade, null);
            })
            .then(() => done())
            .catch((e) => done(e));
    });

    it('sets an assignment weight', function (done) {
        assignmentDB.setUpTable()
            .then(() => assignmentDB.create(testAssignment))
            .then(() => assignmentDB.setWeight(testAssignment.id, 0))
            .then(() => assignmentDB.getByID(testAssignment.id))
            .then((response) => {
                assert.equal(response.weight, 0);
            })
            .then(() => assignmentDB.setWeight(testAssignment.id, 50))
            .then(() => assignmentDB.getByID(testAssignment.id))
            .then((response) => {
                assert.equal(response.weight, 50);
            })
            .then(() => done())
            .catch((e) => done(e));
    });

})