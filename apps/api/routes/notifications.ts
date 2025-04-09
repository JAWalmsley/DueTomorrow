import { notificationData, notificationDBInstance } from "../databaseManagers/NotificationDB";

const express = require('express');
const webpush = require('web-push');
const router = express.Router({mergeParams: true});
const {isUserAuthorized} = require("./userAuth");

if(process.env.DEBUG)
{
    console.log("DEBUG MODE, not sending any push notifications");
}
else
{
    webpush.setVapidDetails('https://duetomorrow.ca', process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE)
}

router.post('/', isUserAuthorized, async (req, res) => {
    // console.log("Got a notification request", req);
    if (!(req.body)) return res.status(400).send('Insufficient data given');
    let newNotification: notificationData = {
        auth: req.body.keys.auth,
        endpoint: req.body.endpoint,
        p256dh: req.body.keys.p256dh,
        userid: req.params.userid
    }
    await notificationDBInstance.create(newNotification);
    webpush.sendNotification(req.body, JSON.stringify({title: 'DueTomorrow', body: 'Ready to get notifications!'})).catch(err => console.log(err));
    res.status(200).send('Notification registered');
});

router.put('/', isUserAuthorized, async (req, res) => {
    // console.log("Got a notification request", req);
    if (!(req.body)) return res.status(400).send('Insufficient data given');
    // webpush.sendNotification(req.body, JSON.stringify({title: 'DueTomorrow', body: 'Refreshed notification service!'})).catch(err => console.log(err));
    let oldSub = req.body.oldSubscription;
    let newSub = req.body.newSubscription;
    console.log("Refreshing a push sub", oldSub, newSub);
    if(oldSub === undefined || newSub === undefined) return res.status(400).send('Insufficient data given');
    let newNotification: notificationData = {
        auth: newSub.keys.auth,
        endpoint: newSub.endpoint,
        p256dh: newSub.keys.p256dh,
        userid: req.params.userid
    }
    notificationDBInstance.create(newNotification);
    notificationDBInstance.deleteByEndpoint(oldSub.endpoint)
    res.status(200).send('Notification registered');
});

export default router