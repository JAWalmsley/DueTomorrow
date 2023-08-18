const express = require('express');
const webpush = require('web-push');
const router = express.Router({mergeParams: true});
const dbManager = require('../dbManager');
const {isUserAuthorized} = require("./userAuth");

webpush.setVapidDetails('https://duetomorrow.ca', process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE)

router.post('/', isUserAuthorized, async (req, res) => {
    // console.log("Got a notification request", req);
    if (!(req.body)) return res.status(400).send('Insufficient data given');
    webpush.sendNotification(req.body, JSON.stringify({title: 'DueTomorrow', body: 'Ready to get notifications!'})).catch(err => console.log(err));
    dbManager.Notification.create(req.params.userid, req.body.endpoint, req.body.keys.p256dh, req.body.keys.auth);
    res.status(200).send('Notification registered');
});

module.exports = router;