import { initCalendar } from './inititalCalendarData.js';
import { setStorage } from './storage.js';
import { renderLoader, hideLoader } from './renderLoader.js';
import { remindersStorage } from './storage.js';
import { renderCalendar } from './renderCalendar.js';
import { postReminder, updateReminder, deleteReminder } from './gateWay.js';


// Reset Pop Up form
const popUp = document.querySelector('.pop-up-form');
const deleteBtn = document.querySelector(".calendar-issues-form__delete-btn")
const colorItemInput = document.getElementById("item-color");

const resetPopUpForm = () => {
    title.value = null;
    date.value = null;
    startTime.value = null;
    finishTime.value = null;
    description.value = null;
    initCalendar.id = null;
    deleteBtn.disabled = true;
    initCalendar.editMode = false;
    colorItemInput.value = initCalendar.itemColor;
    popUp.setAttribute("style", "visibility: hidden;");
}

export const renderPopUpForm = () => {

    // Delete reminder from calendar  
    const onDelete = () => {
        renderLoader()
        deleteReminder(initCalendar.id)
            .then(() => {
                const getIndexOfElement = remindersStorage.findIndex(element => element.id == initCalendar.id);
                remindersStorage.splice(getIndexOfElement, 1);
                resetPopUpForm();
                renderCalendar();
                setStorage();
                hideLoader();
            })


    }
    deleteBtn.addEventListener('click', onDelete)

    const closePopUpBtn = document.querySelector('.pop-up-form__close-btn');

    //Close pop up form

    const onCloseBtn = () => resetPopUpForm();
    closePopUpBtn.addEventListener('click', onCloseBtn);

    const popUpForm = document.querySelector(".calendar-issues-form");

    // Submitin new reminder or edit current
    const onSubmit = event => {
        event.preventDefault();
        renderLoader();

        // Eidt reminder current
        if (initCalendar.editMode) {
            const editedReminder = {
                title: title.value,
                date: date.value,
                startTime: startTime.value,
                finishTime: finishTime.value,
                description: description.value,
                itemColor: colorItemInput.value,
            }
            updateReminder(editedReminder, initCalendar.id)
                .then(data => {
                    let indexOfEditingReminder = remindersStorage.findIndex(item => item.id == initCalendar.id);
                    remindersStorage[indexOfEditingReminder] = { ...data };
                    setStorage();
                    resetPopUpForm();
                    renderCalendar();
                    hideLoader();
                })
        } else {
            // Adding new reminder
            // Preparing new Reminder Data item for posting
            const newReminder = {
                title: title.value,
                date: date.value,
                startTime: startTime.value,
                finishTime: finishTime.value,
                description: description.value,
                itemColor: colorItemInput.value,
            }
            postReminder(newReminder)
                .then(data => {
                    remindersStorage.push(data);
                    resetPopUpForm();
                    setStorage();
                    renderCalendar();
                    hideLoader();
                })
        }
    }
    popUpForm.addEventListener("submit", onSubmit)
}



