const config = require('./config.json');

/**
 * Users
 */

export function APIlogin(data) {
    return fetch(config.endpoint + 'login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.status === 200) {
            return res.text();
        }
        throw new Error(res.statusText);
    });
}

export function APIregister(data) {
    return fetch(config.endpoint + 'users', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.status === 200) {
            return res.text();
        }
        throw new Error(res.statusText);
    });
}

export function APIUsernameGet(userid) {
    return fetch(config.endpoint + 'users/' + userid, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

/**
 * Assignments
 */
export function APIAssignmentsGet(userid) {
    return fetch(config.endpoint + 'users/' + userid + '/assignments', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

/**
 * Creates a new assignment
 * @param {*} data
 * @returns
 */
export function APIAssignmentPost(data) {
    return fetch(config.endpoint + 'users/' + data.userid + '/assignments/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.status === 200) {
            return res.text();
        }
        throw new Error(res.statusText);
    });
}

/**
 *
 * @param {Object} data the data to modify
 * @param {String} data.userid your userid
 * @param {String} data.assignmentid the assignmentid to modify
 * @returns
 */
export function APIAssignmentModify(data) {
    return fetch(
        config.endpoint +
            'users/' +
            data.userid +
            '/assignments/' +
            data.id,
        {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        }
    ).then((res) => {
        if (res.status === 200) {
            return res.text();
        }
        throw new Error(res.statusText);
    });
}

/**
 * Courses
 */

/**
 * Gets the courses belonging to a user
 * @param {String} userid
 * @returns
 */
export function APICoursesGet(userid) {
    return fetch(config.endpoint + 'users/' + userid + '/courses', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}
