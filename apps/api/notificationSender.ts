import { assignmentDBInstance } from "./databaseManagers/AssignmentDB";
import { courseDBInstance } from "./databaseManagers/CourseDB";
import { notificationDBInstance } from "./databaseManagers/NotificationDB";
import { userDBInstance } from "./databaseManagers/UserDB";

import { webpush } from 'web-push';
if (process.env.DEBUG) {
    console.log("DEBUG MODE, not sending any push notifications");
}
else {
    webpush.setVapidDetails('https://duetomorrow.ca', process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE)
}
export async function sendReminderNotifications() {
    if (process.env.DEBUG) {
        console.log("DEBUG MODE, not sending any push notifications");
        return;
    }
    console.log("Sending scheduled notifications");
    let users = await userDBInstance.getAll()
    for (let user of users) {
        // TODO: send to all subcriptions
        let subscriptions = await notificationDBInstance.getByUserID(user.id);
        if (subscriptions.length === 0) continue;
        // For every device the user gets subscriptions on
        for (let subscription of subscriptions) {
            // Get all assignments user owns
            let assignments = await assignmentDBInstance.getByUserID(user.id);
            for (let assignment of assignments) {
                if (assignment.done) continue; // Dont notify for finished assignments
                let d = new Date(assignment.due);
                // Get number of days until the assignment is due
                let daysUntil = (d.valueOf() - new Date().valueOf()) / (1000 * 60 * 60 * 24);
                if (daysUntil < 1 && daysUntil > -1) {
                    let course = (await courseDBInstance.getByID(assignment.courseid))[0];
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
        JSON.stringify({ title: course.name, body: assignment.name + ' is due tomorrow' })).catch(err => {
            if (err.statusCode === 410) {
                // Delete this endpoint because the subscription expired (error 410)
                notificationDBInstance.deleteByEndpoint(subscription.endpoint);
            } else {
                console.log(err);
            }
        });
}