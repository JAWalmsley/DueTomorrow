const chai = require('chai');
const chaiHttp = require('chai-http');
const uuid = require('uuid');

const dbManager = require('../dbManager');
const server = require('../server');

chai.use(chaiHttp);

let expect = chai.expect;

let agent = chai.request.agent(server);
let userid;

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
                expect(res.text).to.not.be.undefined;
                userid = res.text;
                done();
            });
        });
        it('should get a user', function(done) {
            agent.get('/users/${userid}')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('username');
                    done();
                })
        });
        it('should update a user', function(done) {
            agent.put('/users/${userid}')
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
    describe('Course', function() {
        let courseid;
        it('should create a course', function (done) {
            agent.post('/users/${userid}/courses')
                .set('content-type', 'application/json')
                .send({name: 'coursename', colour: '#ffffff', credits: 3})
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    console.log(res.text)
                    expect(res).to.have.status(200);
                    expect(res.text).to.not.be.undefined;
                    courseid = res.text;
                    done();
                });
        });
        it('should get a user', function(done) {
            agent.get('/users/' + userid)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('username');
                    done();
                })
        });
        it('should update a user', function(done) {
            agent.put('/users/' + userid)
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
    })
});

after(function () {
    server.close(function () {
        console.log('Testing Done!');
    });
});
