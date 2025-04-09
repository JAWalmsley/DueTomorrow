import assert = require('assert');
import { Database } from "sqlite3";
import { userData, UserDB } from '../databaseManagers/UserDB';
import { notificationData, NotificationDB } from '../databaseManagers/NotificationDB';


describe('Notification Database', function () {
    let userDB = new UserDB('testdb.db');
    let notificationDB = new NotificationDB('testdb.db');
    let testingCon = new Database('testdb.db');

    let testUser: userData = {
        id: 'testuserid',
        password: 'testpassword',
        username: 'testusername'
    }

    let testNotification: notificationData = {
        auth: 'test auth',
        endpoint: 'test endpoint',
        p256dh: 'test p256dh',
        userid: testUser.id
    }

    let testNotification2: notificationData = {
        auth: 'test auth 2',
        endpoint: 'test endpoint 2',
        p256dh: 'test p256dh 2',
        userid: testUser.id
    }

    beforeEach(async function () {
        try {
            await userDB.clearDB();
            await notificationDB.clearDB();
        }
        catch {
            // Table might not exist yet, run first test to setup table
            // Do nothing
        }
        await userDB.setUpTable();
        await userDB.create(testUser);
    });

    it('sets up table', function (done) {
        notificationDB.setUpTable()
            .then(() => {
                testingCon.get("SELECT name FROM sqlite_master WHERE type='table' AND name='notifications';", function (e, r: { name }) {
                    assert.equal(r.name, 'notifications');
                    done();
                });
            })
            .catch((e) => done(e));
    });

    it('creates a notification', function (done) {
        notificationDB.setUpTable()
            .then(() => notificationDB.create(testNotification))
            .then(() => testingCon.get("SELECT * FROM notifications WHERE endpoint = ?", [testNotification.endpoint], function (e, r: notificationData) {
                assert.deepEqual(r, testNotification);
                done();
            }))
            .catch((e) => done(e));
    });

    it('gets all notifications belonging to a user', function (done) {
        notificationDB.setUpTable()
            .then(() => notificationDB.create(testNotification))
            .then(() => notificationDB.create(testNotification2))
            .then(() => notificationDB.getByUserID(testUser.id))
            .then((response: notificationData[]) => {
                assert.equal(response.length, 2);
                assert.equal(response.some((item) => item.endpoint == testNotification.endpoint), true);
                assert.equal(response.some((item) => item.endpoint == testNotification2.endpoint), true);
                done();
            })
            .catch((e) => done(e));
    });

    it('does not get notifications not belonging to a user', function (done) {
        notificationDB.setUpTable()
            .then(() => notificationDB.getByUserID(testUser.id))
            .then((response: notificationData[]) => {
                assert.equal(response.length, 0);
                done();
            })
            .catch((e) => done(e));
    });

    it('deletes a notification by endpoint', function (done) {
        notificationDB.setUpTable()
            .then(() => notificationDB.create(testNotification))
            .then(() => notificationDB.deleteByEndpoint(testNotification.endpoint))
            .then(() => notificationDB.getByUserID(testUser.id))
            .then((response: notificationData[]) => {
                assert.equal(response.length, 0);
                done();
            })
            .catch((e) => done(e));
    })
});