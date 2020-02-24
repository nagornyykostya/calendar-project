import { renderError } from './erroPopUp.js';

const baseLink = 'http://5e4ebaa86272aa0014230ec4.mockapi.io/Calendar';
const defaultColorLink = 'http://5e4ebaa86272aa0014230ec4.mockapi.io/calendarInitColor';

// Reminders items REST scripts

export const getReminders = () => {
    return fetch(baseLink).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Loading data failed')
        }
    })
        .catch(error => {
            renderError(error)
        });
}

export const postReminder = (reminderData) => {
    return fetch(baseLink, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(reminderData)
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Loading data failed')
        }
    })
        .catch(error => {
            renderError(error)
        });
}

export const updateReminder = (reminderData, reminderId) => {
    return fetch(`${baseLink}/${reminderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(reminderData)
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Loading data failed')
        }
    })
        .catch(error => {
            renderError(error)
        });
}

export const deleteReminder = (reminderId) => {
    return fetch(`${baseLink}/${reminderId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Loading data faileda')
        }
    })
        .catch(error => {
            renderError(error)
        });
}

// Default color REST scripts

export const getDefaultColor = () => {
    return fetch(defaultColorLink).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Loading init calendar color failed')
        }
    })
        .catch(error => {
            renderError(error)
        });
}

export const updateDefaultColor = (newDefaultColor) => {
    return fetch(`${defaultColorLink}/1`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newDefaultColor)
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Loading init calendar color failed')
        }
    })
        .catch(error => {
            renderError(error)
        });
}
