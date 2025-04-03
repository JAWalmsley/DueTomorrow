import assert = require('assert');
import { UserDB, userData } from '../databaseManagers/UserDB';
import { Database } from "sqlite3";

describe('User Database', function () {
    let userDB = new UserDB('testdb.db');
    let testingCon = new Database('testdb.db');

    let testData: userData = {
        id: 'testid',
        username: 'testusername',
        password: 'testpw'
    }
    let testData2: userData = {
        id: 'testid2',
        username: 'testusername2',
        password: 'testpw2'
    }

    beforeEach(async function () {
        await userDB.clearDB();
    });

    it('sets up table', function () {
        userDB.setUpTable().then(() => {
            testingCon.get("SELECT name FROM sqlite_master WHERE type='table' AND name='logins';", function (e, r: { name }) {
                assert.equal(r.name, 'logins');
            });
        })

    });

    it('creates a user', function (done) {
        userDB.setUpTable()
            .then(() => userDB.create(testData))
            .then(() => testingCon.get("SELECT id, password FROM logins WHERE id = ?;", testData.id, function (e, r: { id: string, password: string }) {
                assert.equal(r.id, testData.id);
                assert.equal(r.password, testData.password);
                done();
            }))
    });

    it('gets a user', function (done) {
        userDB.setUpTable()
            .then(() => userDB.create(testData))
            .then(() => userDB.getByUserID(testData.id))
            .then((response: (null | userData)) => {
                assert.equal(response.id, testData.id);
            })
            .then(() => userDB.getByUsername(testData.username))
            .then((response: (null | userData)) => {
                assert.equal(response.id, testData.id);
                done();
            })
    });

    it('does not get a nonexistant user', function (done) {
        userDB.setUpTable()
            .then(() => userDB.getByUserID('doesntexist'))
            .then((response: (null | userData)) => {
                assert.equal(response, null);
                done();
            })
    })

    it('gets all users', function (done) {
        userDB.setUpTable()
            .then(() => userDB.create(testData))
            .then(() => userDB.create(testData2))
            .then(() => userDB.getAll())
            .then((response: (null | userData[])) => {
                assert.notEqual(response, null);
                assert.equal(response.length, 2);
                assert.equal(response.some((item) => item.id == testData.id), true);
                assert.equal(response.some((item) => item.id == testData2.id), true);
                done();
            })
    });

    it('changes a user\'s password', function (done) {
        let newpass = 'newpassword';
        userDB.setUpTable()
            .then(() => userDB.create(testData))
            .then(() => userDB.setPassword(testData.id, newpass))
            .then(() => userDB.getByUserID(testData.id))
            .then((response: (null | userData)) => {
                assert.equal(response.id, testData.id);
                assert.equal(response.password, newpass);
                done();
            });
    })
})