// Getting the reminders for calendar;
import { remindersStorage } from './storage.js';

export const getRemindersArrFilterByWeek = (currentMonday) => {
    let result = remindersStorage.filter(item => new Date(item.date).getMonth() === new Date(currentMonday).getMonth() &&
        new Date(item.date).getFullYear() == new Date(currentMonday).getFullYear() &&
        new Date(item.date).getDate() == new Date(currentMonday).getDate())
    if (result.length > 0) {
        return result;
    } else {
        return false;
    }
        // .sort((a, b) => new Date(a.date) - new Date(b.date));
}

export const getRemindersObjByHourStart = (arr, hours) => {
    return arr.find(item => {
        return item.startTime.split(":")[0] === (hours < 10 ? `0${hours}`:`${hours}`)});
}
// < 10 ? `0${hours}`: `${hours}`
// // Geting the right class for elements 
// if (getRemindersObjByHourStart(("00").startTime.split(":")[1] == "00")) {
//     // add class;
// } else if (getRemindersObjByHourStart(("00").startTime.split(":")[1] == "15")) {
//     // add class;
// } else if (getRemindersObjByHourStart(("00").startTime.split(":")[1] == "30")) {
//     // add class;
// } else if (getRemindersObjByHourStart(("00").startTime.split(":")[1] == "45")) {
//     // add class;
// } 