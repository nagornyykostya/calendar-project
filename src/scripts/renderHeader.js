import { initCalendar, setStorage } from './storage.js';
import { changeWeek } from './weekSelector.js';
import { renderNavbar } from './renderNavbar.js';
import { renderCalendar } from './renderCalendar.js';

const popUp = document.querySelector('.pop-up-form');
const deleteBtn = document.querySelector(".calendar-issues-form__delete-btn")
const title = document.getElementById("title");
const date = document.getElementById("date");
const startTime = document.getElementById("startTime");
const finishTime = document.getElementById("finishTime");
const description = document.getElementById("description");
const colorItemInput = document.getElementById("item-color");

export const renderHeaderText = () => {
    const headerSelectedPeriod = document.querySelector(".header__selected-period");
    const currentMonday = new Date(initCalendar.selectedWeek);
    let checkDay = initCalendar.selectedWeek;
    let period = `${initCalendar.monthes[currentMonday.getMonth()]} ${currentMonday.getFullYear()}`
    for (let i = 0; i < 6; i++) {
        checkDay += initCalendar.miliSecondsPerDay;
        if (new Date(checkDay).getMonth() != currentMonday.getMonth()) {
            if (new Date(checkDay).getFullYear() != currentMonday.getFullYear()) {
                period = `${initCalendar.monthes[currentMonday.getMonth()]} ${currentMonday.getFullYear()} - ${initCalendar.monthes[new Date(checkDay).getMonth()]} ${new Date(checkDay).getFullYear()}`;
            } else {
                period = `${initCalendar.monthes[currentMonday.getMonth()]} - ${initCalendar.monthes[new Date(checkDay).getMonth()]} ${currentMonday.getFullYear()}`;
            }
        }
    }
    headerSelectedPeriod.innerHTML = period;
}

// Switch week with navigation;
const previousWeek = document.querySelector(".weeks-selectors-block__previous-week");
const nextWeek = document.querySelector(".weeks-selectors-block__next-week");

const onTodayClick = () => {
    initCalendar.getMonday();
    renderNavbar();
    renderCalendar();
    renderHeaderText();
    setStorage();
}

const todayBtn = document.querySelector('.header__today');

// Create Btn
const createBtn = document.querySelector('.header__create');
const onCreateBtnClick = () => {
    popUp.setAttribute("style", "visibility: visible;")
    const dateNow2 = new Date();
    date.value = `${dateNow2.getFullYear()}-${dateNow2.getMonth() < 10 ? `0${dateNow2.getMonth() + 1}` : `${dateNow2.getMonth() + 1}`}-${dateNow2.getDate() < 10 ? `0${dateNow2.getDate()}` : `${dateNow2.getDate()}`}`

    title.value = null;
    startTime.value = null;
    finishTime.value = null;
    description.value = null;
    colorItemInput.value = initCalendar.itemColor;
    initCalendar.id = null;
    deleteBtn.disabled = true;
    initCalendar.editMode = false;
    setStorage();
};

export const initHeaderEventListeners = () => {
    createBtn.addEventListener('click', onCreateBtnClick)
    previousWeek.addEventListener('click', changeWeek);
    nextWeek.addEventListener('click', changeWeek);
    todayBtn.addEventListener('click', onTodayClick);
}

