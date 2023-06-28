const dbManager = require('./dbManager.js')
const webpush = require('web-push');
webpush.setVapidDetails('https://duetomorrow.ca', process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE)

async function sendReminderNotifications() {
    console.log("Sending scheduled notifications");
    let users = await dbManager.User.getAll()
    for (let user of users) {
        // TODO: send to all subcriptions
        let subscriptions = await dbManager.Notification.getByUserID(user.id);
        if (subscriptions.length === 0) continue;
        // For every device the user gets subscriptions on
        for (let subscription of subscriptions) {
            // Get all assignments user owns
            let assignments = await dbManager.Assignment.getByUserID(user.id);
            for (let assignment of assignments) {
                if (assignment.done) continue; // Dont notify for finished assignments
                let d = new Date(assignment.due);
                // Get number of days until the assignment is due
                let daysUntil = Math.floor((d - new Date()) / (1000 * 60 * 60 * 24));
                if (daysUntil <= 1 && daysUntil > -1) {
                    let course = (await dbManager.Course.getByID(assignment.courseid))[0];
                    sendPush(assignment, course, subscription);
                }
            }
        }
    }
}

async function sendPush(assignment, course, subscription) {
    await webpush.sendNotification({
        endpoint: subscription.endpoint,
        keys:
        {
            auth: subscription.auth,
            p256dh: subscription.p256dh
        }
    },
        JSON.stringify({ title: course.name, body: assignment.name + ' is due tomorrow' })).catch(err => console.log(err));
}

module.exports = sendReminderNotifications;