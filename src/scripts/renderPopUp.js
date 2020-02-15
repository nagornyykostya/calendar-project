import { initCalendar } from './storage.js';
import { remindersStorage } from './storage.js';
import { renderCalendar } from './renderCalendar.js';


// reset Pop Up form
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

// Delete BTN 

const onDelete = () => {
    const getIndexOfElement = remindersStorage.findIndex(element => element.id == initCalendar.id);
    remindersStorage.splice(getIndexOfElement, 1);
    resetPopUpForm();
    renderCalendar();
}
deleteBtn.addEventListener('click', onDelete)

const closePopUpBtn = document.querySelector('.pop-up-form__close-btn');
const onCloseBtn = () => resetPopUpForm();
closePopUpBtn.addEventListener('click', onCloseBtn);

const popUpForm = document.querySelector(".calendar-issues-form");
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
        getEditObject.itemColor = colorItemInput.value;

    } else {

        remindersStorage.push({
            title: title.value,
            date: date.value,
            startTime: startTime.value,
            finishTime: finishTime.value,
            description: description.value,
            itemColor: colorItemInput.value,
            id: Math.random()
        });
    }
    renderCalendar();
    resetPopUpForm()
    console.log(remindersStorage);
}
popUpForm.addEventListener("submit", onSubmit)
}



