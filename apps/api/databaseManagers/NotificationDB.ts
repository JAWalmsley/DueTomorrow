import { DBManager } from "./dbManager";

export interface notificationData {
    userid: string;
    endpoint: string;
    p256dh: string;
    auth: string;
}

export class NotificationDB extends DBManager {
    setUpTable(): Promise<any> {
        return this.makeReq('CREATE TABLE IF NOT EXISTS notifications (userid VARCHAR(255), endpoint TEXT PRIMARY KEY, p256dh TEXT, auth TEXT, FOREIGN KEY (userid) REFERENCES logins(id) ON DELETE CASCADE)',
            []
        );
    }

    create(data: notificationData): Promise<any> {
        return this.makeReq('INSERT INTO notifications (userid, endpoint, p256dh, auth) VALUES (?, ?, ?, ?)', [data.userid, data.endpoint, data.p256dh, data.auth]);
    }

    getByUserID(userid: string): Promise<notificationData[]> {
        return this.makeReq('SELECT * FROM notifications WHERE userid = ?', [userid]);
    }

    deleteByEndpoint(endpoint: string): Promise<any> {
        return this.makeReq('DELETE FROM notifications WHERE endpoint = ?', [endpoint]);
    }

    clearDB(): Promise<any> {
        return this.makeReq('DELETE FROM notifications',
            []
        );
    }
}