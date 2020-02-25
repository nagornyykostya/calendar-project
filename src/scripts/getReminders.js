import { remindersStorage } from './storage.js';

// Getting the reminders for calendar;

const isSameDate = (item, currentMonday) => new Date(item.date).getMonth() === new Date(currentMonday).getMonth() &&
new Date(item.date).getFullYear() === new Date(currentMonday).getFullYear() &&
new Date(item.date).getDate() === new Date(currentMonday).getDate();

export const getRemindersArrFilterByWeek = (currentMonday) => 
    remindersStorage.filter(item => isSameDate(item, currentMonday));

export const getRemindersObjByHourStart = (arr, hours) => {
    return arr.filter(item => {
        return item.startTime.split(":")[0] == (hours < 10 ? `0${hours}` : `${hours}`)
    });
}