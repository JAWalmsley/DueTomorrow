import { DBManager } from "./dbManager";

export interface sharecodeData {
    code: string;
    courseids: string[];
}

export class SharecodeDB extends DBManager {
    setUpTable(): Promise<any> {
        return this.makeReq('CREATE TABLE IF NOT EXISTS sharecodes (code VARCHAR(50), courseid VARCHAR(255),PRIMARY KEY (code, courseid), FOREIGN KEY (courseid) REFERENCES courses(id) ON DELETE CASCADE);',
            []
        );
    }

    create(data: sharecodeData): Promise<any> {
        return this.codeExists(data.code)
        .then((exists) => {
            if (!exists) {
                const promises = data.courseids.map((courseid) => {
                    return this.makeReq('INSERT INTO sharecodes (code, courseid) VALUES (?, ?)', [data.code, courseid]);
                });
                return Promise.all(promises);
            }
        });
    }

    codeExists(code: string): Promise<boolean> {
        return this.makeReq('SELECT 1 FROM sharecodes WHERE code = ?', [code])
        .then((resp: sharecodeData[]) => {
            return (resp.length > 0);
        });
    }

    getByCode(code: string): Promise<sharecodeData> {
        let returnData: sharecodeData = {code: code, courseids: []};
        return this.makeReq('SELECT * FROM sharecodes WHERE code = ?', [code])
        .then((response) => {
            response.forEach((elem) => {
                returnData.courseids.push(elem.courseid);
            })
        })
        .then(() => {
            return returnData;
        })
    }

    clearDB() {
        return this.makeReq('DELETE FROM sharecodes', []);
    }
}