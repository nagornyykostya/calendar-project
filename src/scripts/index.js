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


// Delete BTN 

const deleteBtn = document.querySelector(".calendar-issues-form__delete-btn")
const onDelete = () => {
    const getIndexOfElement = remindersStorage.findIndex(element => element.id == initCalendar.id);
    remindersStorage.splice(getIndexOfElement, 1);

    title.value = null;
    date.value = null;
    startTime.value = null;
    finishTime.value = null;
    description.value = null;
    deleteBtn.disabled = true;
    popUp.setAttribute("style", "visibility: hidden;");
    initCalendar.id = null;
    initCalendar.editMode = false;
    renderCalendar();
}

deleteBtn.addEventListener('click', onDelete)

// Popup form
const popUp = document.querySelector('.pop-up-form');
const closePopUpBtn = document.querySelector('.pop-up-form__close-btn');
const onCloseBtn = () => {
    popUp.setAttribute("style", "visibility: hidden;")
    title.value = null;
    date.value = null;
    startTime.value = null;
    finishTime.value = null;
    description.value = null;
    deleteBtn.disabled = true;
    initCalendar.editMode = false;


};
closePopUpBtn.addEventListener('click', onCloseBtn);

const popUpForm = document.querySelector(".calendar-issues-form");

const title = document.getElementById("title");
const date = document.getElementById("date");
const startTime = document.getElementById("startTime");
const finishTime = document.getElementById("finishTime");
const description = document.getElementById("description");

const onSubmit = event => {
    event.preventDefault();

    if (initCalendar.editMode) {
        remindersStorage.find(item => item.id === initCalendar.id);
        let getEditObject = remindersStorage.find(item => item.id == initCalendar.id);
        getEditObject.title = title.value;
        getEditObject.date = date.value;
        getEditObject.startTime = startTime.value;
        getEditObject.finishTime = finishTime.value;
        getEditObject.description = description.value;
    } else {

        remindersStorage.push({
            title: title.value,
            date: date.value,
            startTime: startTime.value,
            finishTime: finishTime.value,
            description: description.value,
            id: Math.random()
        });
    }
    renderCalendar();
    title.value = null;
    date.value = null;
    startTime.value = null;
    finishTime.value = null;
    description.value = null;
    initCalendar.id = null;
    deleteBtn.disabled = true;
    popUp.setAttribute("style", "visibility: hidden;");

    console.log(remindersStorage);
}
popUpForm.addEventListener("submit", onSubmit)

// Create Btn

const createBtn = document.querySelector('.header__create');
const onCreateBtnClick = () => {
    popUp.setAttribute("style", "visibility: visible;")
    title.value = null;
    date.value = null;
    startTime.value = null;
    finishTime.value = null;
    description.value = null;
};
createBtn.addEventListener('click', onCreateBtnClick);

// Edit calendar cells 

const dayColumns = document.querySelector(".day-columns");

const onCalendarClick = (event) => {
    console.log(event.toElement.id);
    deleteBtn.disabled = false;
    let getObjectById = remindersStorage.find(item => item.id == event.toElement.id)
    title.value = getObjectById.title;
    date.value = getObjectById.date;
    startTime.value = getObjectById.startTime;
    finishTime.value = getObjectById.finishTime;
    description.value = getObjectById.description;
    initCalendar.editMode = true;
    initCalendar.id = event.toElement.id;
    console.log(getObjectById)
    popUp.setAttribute("style", "visibility: visible;")
}

dayColumns.addEventListener('click', onCalendarClick);

