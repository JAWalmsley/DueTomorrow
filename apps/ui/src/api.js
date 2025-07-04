var config;
try {
    config = require('./config.json');
} catch (err) {
    config = { endpoint: '/api/' };
}
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

export function APILogout() {
    return fetch(config.endpoint + 'logout', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    }).then((res) => {
        if (res.status === 200) {
            return res.text();
        }
        throw res.statusText;
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
        throw res.text();
    })
}

export function APIUsernameGet(userid) {
    return fetch(config.endpoint + 'users/' + userid, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then((e) => {
            if (e.status === 200) {
                return e.json();
            }
            throw new Error();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return null;
        })
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
    })
        .then((e) => {
            if (e.status === 200) {
                return e.json();
            }
            throw new Error();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return null;
        })
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
        return res.status;
    });
}

export function APIAssignmentDelete(data) {
    return fetch(config.endpoint + 'users/' + data.userid + '/assignments/' + data.id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => {
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
    })
        .then((e) => {
            if (e.status === 200) {
                return e.json();
            }
            throw new Error();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return null;
        })
}


/**
 *
 * @param {String} data.userid your userid
 * @param {String} data.courseids the course ids to add to the sharecode
 * @param {String} data.editor is this sharecode an editor sharecode?
 * @returns
 */
export function APICreateCode(data) {
    return fetch(config.endpoint + 'users/' + data.userid + '/sharecodes/', {
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
 * Gets the courses belonging to a share code
 */
export function APICoursesGetByCode(shareCode) {
    return fetch(config.endpoint + 'sharecodes/' + shareCode, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then((e) => {
            if (e.status === 200) {
                return e.json();
            }
            throw new Error();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return null;
        })
}

/**
 * Creates a new course
 * @param {Object} data 
 * @returns 
 */
export function APICoursesPost(data) {
    return fetch(config.endpoint + 'users/' + data.userid + '/courses/', {
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
 * Enrolls a user in a new course from a sharecode
 * @param {string} data.courseid the course id to enroll in
 * @param {string} data.sharecode the sharecode the user came from
 * @returns 
 */
export function APICoursesEnroll(data) {
    console.log('enrolling in course', data);
    return fetch(config.endpoint + 'users/' + data.userid + '/courses/enroll/' + data.courseid, {
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

export function APICoursesDelete(data) {
    return fetch(config.endpoint + 'users/' + data.userid + '/courses/' + data.id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => {
        if (res.status === 200) {
            return res.text();
        }
        throw new Error(res.statusText);
    });
}

/**
 * @param {String} data.userid userid
 * @param {Object} data.subscription notification subscription
 * @returns 
 */
export function APIPushRegister(data) {
    return fetch(config.endpoint + 'users/' + data.userid + '/notifications/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data.subscription),
    }).then((res) => {
        if (res.status === 200) {
            return res.text();
        }
        throw new Error(res.statusText);
    });
}

export function APIPushRenew(data) {
    return fetch(config.endpoint + 'users/' + data.userid + '/notifications/', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ newSubscription: data.newSubscription, oldSubscription: data.oldSubscription })
    }).then((res) => {
        if (res.status === 200) {
            return res.text();
        }
        throw new Error(res.statusText);
    });
}