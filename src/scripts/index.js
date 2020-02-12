import { initCalendar } from './storage.js';
import { remindersStorage } from './storage.js';
import { renderPopUpForm } from './renderPopUp.js';
import { renderNavbar } from './renderNavbar.js';
import { changeWeek } from './weekSelector.js';
import { renderCalendar } from './renderCalendar.js';
import { renderSideBar } from './renderSideBar.js';


const popUp = document.querySelector('.pop-up-form');
const deleteBtn = document.querySelector(".calendar-issues-form__delete-btn")
const title = document.getElementById("title");
const date = document.getElementById("date");
const startTime = document.getElementById("startTime");
const finishTime = document.getElementById("finishTime");
const description = document.getElementById("description");

// getMonday //

initCalendar.getMonday()

// navbar render 

renderNavbar();

// sidebar render ///

renderSideBar();

// render PopUp

renderPopUpForm();


// calendar days render //
renderCalendar();
setInterval(renderCalendar, 60000);

// renderCalendar();

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

// Create Btn

const createBtn = document.querySelector('.header__create');
const onCreateBtnClick = () => {
    popUp.setAttribute("style", "visibility: visible;")
};
createBtn.addEventListener('click', onCreateBtnClick);

// Edit calendar cells 

const dayColumns = document.querySelector(".day-columns");

const onCalendarClick = (event) => {
    if (event.target.innerText) {
    deleteBtn.disabled = false;
    let getObjectById = remindersStorage.find(item => item.id == event.toElement.id)
    title.value = getObjectById.title;
    date.value = getObjectById.date;
    startTime.value = getObjectById.startTime;
    finishTime.value = getObjectById.finishTime;
    description.value = getObjectById.description;
    initCalendar.editMode = true;
    initCalendar.id = event.toElement.id;
    popUp.setAttribute("style", "visibility: visible;")
    }
}

dayColumns.addEventListener('click', onCalendarClick);

