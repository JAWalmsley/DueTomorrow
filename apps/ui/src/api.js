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
}

export function APIregister (data) {
    return fetch(config.endpoint + 'users', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}