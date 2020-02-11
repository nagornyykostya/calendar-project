import { initCalendar } from './storage.js';
import { remindersStorage } from './storage.js';
import { renderNavbar } from './renderNavbar.js';
import { changeWeek } from './weekSelector.js';
import { renderCalendar } from './renderCalendar.js';
import { renderSideBar } from './renderSideBar.js';


// getMonday //

initCalendar.getMonday()

// navbar render 

renderNavbar();

// sidebar render ///

renderSideBar();

// calendar days render //

renderCalendar();

// Switch week with navigation;


const previousWeek = document.querySelector(".weeks-selectors-block__previous-week");
previousWeek.addEventListener('click', changeWeek);
const nextWeek = document.querySelector(".weeks-selectors-block__next-week");
nextWeek.addEventListener('click', changeWeek);

const onTodayClick = () => {
    initCalendar.getMonday()
    renderNavbar();
    renderCalendar();
}

const todayBtn = document.querySelector('.header__today');
todayBtn.addEventListener('click', onTodayClick);

// Popup form
const popUp = document.querySelector('.pop-up-form');
const closePopUpBtn = document.querySelector('.pop-up-form__close-btn');
const onCloseBtn = () => popUp.setAttribute("style", "visibility: hidden;");
closePopUpBtn.addEventListener('click', onCloseBtn);

const popUpForm = document.querySelector(".calendar-issues-form");

const title = document.getElementById("title");
const date = document.getElementById("date");
const startTime = document.getElementById("startTime");
const finishTime = document.getElementById("finishTime");
const description = document.getElementById("description");

const onSubmit = event => {
    event.preventDefault();
    remindersStorage.push({
        title: title.value,
        date: date.value,
        startTime: startTime.value,
        finishTime: finishTime.value,
        description: description.value,
        id: Math.random()
    });
    title.value = null;
    date.value = null;
    startTime.value = null;
    finishTime.value = null;
    description.value = null;

    popUp.setAttribute("style", "visibility: hidden;");
    console.log(remindersStorage);
}
popUpForm.addEventListener("submit", onSubmit)

// Today Btn
const createBtn = document.querySelector('.header__create');
const onTodayBtnClick = () => popUp.setAttribute("style", "visibility: visible;");
createBtn.addEventListener('click', onTodayBtnClick);


