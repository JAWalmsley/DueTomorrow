const chai = require('chai');
const chaiHttp = require('chai-http');
const uuid = require('uuid');

const dbManager = require('../dbManager');
const server = require('../server');

chai.use(chaiHttp);

let expect = chai.expect;

let agent = chai.request.agent(server);
let userid, courseid, assignmentid;
let uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

describe('Routes', function () {
    before(async function () {
        await dbManager.clearDb();
    });
    describe('User', function () {
        it('should create a user', function (done) {
            agent.post('/users')
                .set('content-type', 'application/json')
                .send({username: 'username', password: '0'})
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    expect(res).to.have.status(200);
                    expect(res.text).to.match(uuidRegex);
                    userid = res.text;
                    done();
                });
        });
        it('should get a user', function (done) {
            agent.get(`/users/${userid}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('username');
                    done();
                })
        });
        it('should update a user', function (done) {
            agent.put(`/users/${userid}`)
                .send({username: 'newusername'})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    agent.get('/users/' + userid)
                        .end((err, res) => {
                            expect(res.body.username).to.equal('newusername');
                            done();
                        })
                })
        });
    });
    describe('Course', function () {
        it('should create a course', function (done) {
            agent.post(`/users/${userid}/courses`)
                .set('content-type', 'application/json')
                .send({name: 'coursename', colour: '#ffffff', credits: 3})
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    expect(res).to.have.status(200);
                    expect(res.text).to.match(uuidRegex);
                    courseid = res.text;
                    done();
                });
        });
        it('should get all courses', function (done) {
            agent.get(`/users/${userid}/courses`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.lengthOf(1)
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('colour');
                    expect(res.body[0]).to.have.property('credits');
                    done();
                })
        });
        it('should update a course', function (done) {
            agent.put(`/users/${userid}/courses/${courseid}/`)
                .send({name: 'newname'})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    agent.get(`/users/${userid}/courses`)
                        .end((err, res) => {
                            expect(res.body[0].name).to.equal('newname');
                            done();
                        })
                })
        });
        it('should delete a course', function (done) {
            agent.delete(`/users/${userid}/courses/${courseid}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    agent.get(`/users/${userid}/courses`)
                        .end((err, res) => {
                            expect(res.body).to.have.lengthOf(0);
                            done();
                        })
                })
        })
    });
    describe('Assignment', function () {
        before(function(done) {
            agent.post(`/users/${userid}/courses`)
                .set('content-type', 'application/json')
                .send({name: 'coursename', colour: '#ffffff', credits: 3})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    courseid = res.text;
                    done()
                })
        })
        it('should create an assignment', function (done) {
            agent.post(`/users/${userid}/assignments`)
                .set('content-type', 'application/json')
                .send({courseid: courseid, name: 'assignmentname', due: '2003-09-30', weight: 50})
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    console.log(res.text)
                    expect(res).to.have.status(200);
                    expect(res.text).to.match(uuidRegex);
                    assignmentid = res.text;
                    done();
                });
        });
        it('should get all assignments', function (done) {
            agent.get(`/users/${userid}/assignments`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.lengthOf(1)
                    expect(res.body[0]).to.have.property('courseid');
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('due');
                    expect(res.body[0]).to.have.property('weight');
                    done();
                })
        });
        it('should update an assignment', function (done) {
            agent.put(`/users/${userid}/assignments/${assignmentid}/`)
                .send({name: 'newname'})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    agent.get(`/users/${userid}/assignments`)
                        .end((err, res) => {
                            expect(res.body[0].name).to.equal('newname');
                            done();
                        })
                })
        });
        it('should delete an assignment', function (done) {
            agent.delete(`/users/${userid}/assignments/${assignmentid}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    agent.get(`/users/${userid}/assignments`)
                        .end((err, res) => {
                            expect(res.body).to.have.lengthOf(0);
                            done();
                        })
                })
        })
    })
});

after(function () {
    server.close(function () {
        console.log('Testing Done!');
    });
});
