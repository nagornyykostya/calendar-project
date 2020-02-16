import { remindersStorage } from './storage.js';

// Getting the reminders for calendar;
export const getRemindersArrFilterByWeek = (currentMonday) => {
    let result = remindersStorage.filter(item => new Date(item.date).getMonth() === new Date(currentMonday).getMonth() &&
        new Date(item.date).getFullYear() == new Date(currentMonday).getFullYear() &&
        new Date(item.date).getDate() == new Date(currentMonday).getDate())
    if (result.length > 0) {
        return result;
    } else {
        return false;
    }
}

export const getRemindersObjByHourStart = (arr, hours) => {
    return arr.find(item => {
        return item.startTime.split(":")[0] === (hours < 10 ? `0${hours}` : `${hours}`)
    });
}