import { initCalendar } from './inititalCalendarData.js';

export let remindersStorage = [];

export const getStorage = () => {
    let itemColor = localStorage.getItem("itemColor");
    if (itemColor) {
        initCalendar.itemColor = JSON.parse(itemColor);
    }
    let newArr = localStorage.getItem("remindersStorage");
    if (newArr) {
        remindersStorage = JSON.parse(newArr);
    }
};

export const setStorage = () => {
    localStorage.setItem("itemColor", JSON.stringify(`${initCalendar.itemColor}`));
    localStorage.setItem("remindersStorage", JSON.stringify(remindersStorage));
};