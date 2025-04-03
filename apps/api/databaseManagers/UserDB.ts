import { DBManager } from "./dbManager";

export interface userData {
    // UUID V4 format ID
    id: string;
    username: string;
    password: string;
}


export class UserDB extends DBManager {
    setUpTable()
    {
        return this.makeReq(
            'CREATE TABLE IF NOT EXISTS logins (id VARCHAR(255) PRIMARY KEY, username VARCHAR(255), password VARCHAR(255));',
            []
        );
    }
    
    /**
     * Create a user
     * @returns {Promise} mySQL query Promise
     */
    create(data: userData): Promise<any> {
        return this.makeReq( 
            'INSERT INTO logins (id, username, password) VALUES (?, ?, ?)',
            [data.id, data.username, data.password]
        );
    }

    /**
     * Gets a user by username
     * @param {string} username - The username to search by
     * @returns {Promise<userData>} The first result in the results (should be the only result)
     */
    getByUsername(username): Promise<userData> {
        return this.makeReq('SELECT * FROM logins WHERE username = ?', [
            username,
        ]).then(function (result) {
            return (result as userData[])[0];
        });
    }

    /**
     * Gets all users in the database
     * @returns all users
     */
    getAll(): Promise<userData[]> {
        return this.makeReq('SELECT * FROM logins', []) as Promise<userData[]>;
    }

    /**
     * Gets a user by userid
     * @param {string} userid - The userid to search by
     * @returns {Promise<Object>} The first result in the results (should be the only result)
     */
    getByUserID(userid): Promise<null | userData> {
        return this.makeReq('SELECT * FROM logins WHERE id = ?', [
            userid,
        ]).then(function (result) {
            return (result as userData[])[0];
        });
    }

    /**
     * Updates a user
     * @param userid - The id to update
     * @param newpass - The new password to replace
     */
    setPassword(id, newpass): Promise<any> {
        return this.makeReq('UPDATE logins SET password = ? WHERE id = ?', [
            newpass, id
        ]).then((res) => {
            return res;
        })
    }

    clearDB()
    {
        return this.makeReq('DELETE FROM logins', []);
    }
};
