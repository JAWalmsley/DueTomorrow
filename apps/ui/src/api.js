const config = require('./config.json')

export function APIlogin (data) {
    return fetch(config.endpoint + 'login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    })
    .then((res) => {
        if (res.status === 200) {
            return res.text();
        }
        throw new Error('bad');
    })
}

export function APIregister (data) {
    return fetch(config.endpoint + 'users', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    })
    .then((res) => {
        if (res.status === 200) {
            return res.text();
        }
        throw new Error('bad');
    })
}

export function APIassignmentsGet (userid) {
    return fetch(config.endpoint + 'users/' + userid + '/assignments' , {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}