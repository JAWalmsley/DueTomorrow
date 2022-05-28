const chai = require('chai');
const chaiHttp = require('chai-http');
const uuid = require('uuid');

const dbManager = require('../dbManager');
const server = require('../server');

chai.use(chaiHttp);

let expect = chai.expect;

let agent = chai.request.agent(server);

describe('dbManager', function () {
    before(async function () {
        await dbManager.clearDb();
    });
    describe('Users', function () {
        it('should create a user in the database with no error', function (done) {
            // test password is output of bcrypt.hash("0", 10)
            dbManager
                .createUser(
                    uuid.NIL,
                    'username',
                    '$2b$10$wXch61ldyyTrqH/Ozc/mGe8LJ/aMK3FqHATwnReKu8QcqVaIc7/T.'
                )
                .then(() => {
                    done();
                })
                .catch((err) => done(err));
        });
        it('should find one user in the database', function (done) {
            dbManager
                .getUsers('username')
                .then((res) => {
                    if (res.length == 1) {
                        done();
                    } else {
                        done(Error('wrong length: ' + res.length));
                    }
                })
                .catch((err) => done(err));
        });
    });
    describe('Courses', function () {
        it('should create a course in the database with no error', function (done) {
            dbManager
                .createCourse(uuid.NIL, uuid.NIL, 'courseName', '#000000')
                .then(() => {
                    done();
                })
                .catch((err) => done(err));
        });
        it('should find one course in the database', function (done) {
            dbManager
                .getCourses(uuid.NIL)
                .then((res) => {
                    expect(res.length).to.equal(1);
                    done();
                })
                .catch((err) => done(err));
        });
        it('should delete the course with no error', function (done) {
            dbManager
                .deleteCourse(uuid.NIL)
                .then(() => {
                    done();
                })
                .catch((err) => done(err));
        });
        it('should find zero courses in the database', function (done) {
            dbManager
                .getCourses(uuid.NIL)
                .then((res) => {
                    expect(res.length).to.equal(0);
                    done();
                })
                .catch((err) => done(err));
        });
    });
    describe('Assignments', function () {
        it('should create an assignment with no error', function (done) {
            dbManager
                .createAssignment(
                    uuid.NIL,
                    uuid.NIL,
                    'assignmentName',
                    'courseName',
                    '0000-00-00',
                    false
                )
                .then((res) => {
                    done();
                })
                .catch((err) => done(err));
        });
        it('should find one assignment in the database', function (done) {
            dbManager
                .getAssignments(uuid.NIL)
                .then((res) => {
                    expect(res.length).to.equal(1);
                    done();
                })
                .catch((err) => done(err));
        });
        it('should delete an assignment with no error', function (done) {
            dbManager
                .deleteAssignment(uuid.NIL)
                .then((res) => {
                    done();
                })
                .catch((err) => done(err));
        });
        it('should find zero assignments in the database', function (done) {
            dbManager
                .getAssignments(uuid.NIL)
                .then((res) => {
                    expect(res.length).to.equal(0);
                    done();
                })
                .catch((err) => done(err));
        });
    });
});

describe('Routes', function () {
    before(async function () {
        await dbManager.clearDb();
        await dbManager.createUser(
            uuid.NIL,
            'username',
            '$2b$10$wXch61ldyyTrqH/Ozc/mGe8LJ/aMK3FqHATwnReKu8QcqVaIc7/T.'
        );
    });
    describe('Login', function () {
        it('should return the login page', function (done) {
            agent.get('/login').end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                expect(res.text).to.contain('BetterThanExcel');
                done();
            });
        });
        it('should log in with previously created user', function (done) {
            agent
                .post('/login')
                .set('content-type', 'application/json')
                .send({ username: 'username', password: '0' })
                .end(function (err, res, bod) {
                    if (err) {
                        done(err);
                        return;
                    }
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('should reject the incorrect password for the user', function (done) {
            agent
                .post('/login')
                .set('content-type', 'application/json')
                .send({ username: 'username', password: 'wrongpassword' })
                .end(function (err, res, bod) {
                    if (err) {
                        done(err);
                        return;
                    }
                    expect(res).to.have.status(401);
                    done();
                });
        });
    });
    describe('Index', function () {
        it('should return the index page as we are logged in', function (done) {
            agent.get('/').end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                expect(res.text).to.contain('Courses');
                done();
            });
        });
    });
    describe('Register', function () {
        it('should return the register page', function (done) {
            agent.get('/register').end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                expect(res.text).to.contain('BetterThanExcel');
                done();
            });
        });
        it('should fail to create a duplicate user', function (done) {
            agent
                .post('/register')
                .set('content-type', 'application/json')
                .send({ username: 'username', password: 'wrongpassword' })
                .end(function (err, res, bod) {
                    if (err) {
                        done(err);
                        return;
                    }
                    expect(res).to.have.status(401);
                    done();
                });
        });
    });
});

after(function () {
    server.close(function () {
        console.log('Testing Done!');
    });
});