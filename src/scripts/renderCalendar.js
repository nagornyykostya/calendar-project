import { initCalendar, remindersStorage } from './storage.js';
import { getRemindersArrFilterByWeek, getRemindersObjByHourStart } from './getReminders.js';

const dayColumns = document.querySelector(".day-columns");
const popUp = document.querySelector('.pop-up-form');
const deleteBtn = document.querySelector(".calendar-issues-form__delete-btn")
const title = document.getElementById("title");
const date = document.getElementById("date");
const startTime = document.getElementById("startTime");
const finishTime = document.getElementById("finishTime");
const description = document.getElementById("description");
const colorItemInput = document.getElementById("item-color");

export const renderCalendar = () => {

    let arrDayColumns = [];

    for (let i = 0; i < 7; i++) {
        let datesPerWeek = initCalendar.selectedWeek + (i * initCalendar.miliSecondsPerDay);
        let arrDayCells = [];
        let remindersPerDay = getRemindersArrFilterByWeek(datesPerWeek);
        for (let i = 0; i < 24; i++) {
            if (remindersPerDay) {
                const reminder = getRemindersObjByHourStart(remindersPerDay, i);
                if (reminder != undefined) {
                    const duration = getDuration(reminder.finishTime, reminder.startTime);
                    const startMinutes = getMinutesStart(reminder.startTime);
                    arrDayCells.push(`<div class="day-column__hour-cell" id="${i < 10 ? "0" + i : i}:00"><div class="day-column__reminder-item" style="min-height:${duration}px;top:${startMinutes}px;background-color:${reminder.itemColor}" id="${reminder.id}">${reminder.title}<br>${reminder.startTime} - ${reminder.finishTime}</div></div>`);
                } else {
                    arrDayCells.push(`<div class="day-column__hour-cell"  id="${i < 10 ? "0" + i : i}:00"></div>`);
                }
            } else {
                arrDayCells.push(`<div class="day-column__hour-cell" id="${i < 10 ? "0" + i : i}:00"></div>`);
            }
        }
        let columnCellsElements = arrDayCells.join('');

        arrDayColumns.push(` <div class="day-column" data-date="${datesPerWeek}">${columnCellsElements}</div>`)
    }
    dayColumns.innerHTML = arrDayColumns.join('');
    renderCurrentTimeLine();
}


const renderCurrentTimeLine = () => {
    const dayColumnsArray = [...dayColumns.children];
    const currentDate = dayColumnsArray.find(item => new Date(+item.dataset.date).getDate() === new Date().getDate() && new Date(+item.dataset.date).getMonth() === new Date().getMonth())
    if (currentDate != undefined) {
        const currentTimeLine = document.createElement('div');
        currentTimeLine.innerHTML = `<div class="day-column__current-time">${new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}</div>`;
        currentTimeLine.classList.add('day-column__current-time-line');
        currentDate.appendChild(currentTimeLine);
        const currentMinute = new Date().getHours() * 60 + new Date().getMinutes();
        currentTimeLine.style.top = `${currentMinute}px`;
    }
}



const getDuration = (finishTime, startTime) => {
    let getDate = (string) => new Date(0, 0, 0, string.split(':')[0], string.split(':')[1]);
    let different = (getDate(finishTime) - getDate(startTime));
    let hours = Math.floor((different % 86400000) / 3600000);
    let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
    return hours * 60 + minutes;
}

const getMinutesStart = (startTime) => {
    return startTime.split(':')[1];
}

// Edit calendar cells 
const onCalendarClick = (event) => {
    if (event.target.innerText) {
        deleteBtn.disabled = false;
        let getObjectById = remindersStorage.find(item => item.id == event.toElement.id)
        title.value = getObjectById.title;
        date.value = getObjectById.date;
        startTime.value = getObjectById.startTime;
        finishTime.value = getObjectById.finishTime;
        description.value = getObjectById.description;
        colorItemInput.value = getObjectById.itemColor;
        initCalendar.editMode = true;
        initCalendar.id = event.toElement.id;
        popUp.setAttribute("style", "visibility: visible;")
    } else {
        startTime.value = event.target.id;
        finishTime.value = event.target.id.slice(0, 2) + `:15`;

        const dateOfCell = new Date(+event.target.parentElement.dataset.date);

        date.value = `${dateOfCell.getFullYear()}-${dateOfCell.getMonth() < 10 ?
            `0${dateOfCell.getMonth() + 1}` :
            `${dateOfCell.getMonth() + 1}`}-${dateOfCell.getDate() < 10 ?
                `0${dateOfCell.getDate()}` : `${dateOfCell.getDate()}`}`
        colorItemInput.value = initCalendar.itemColor;
        popUp.setAttribute("style", "visibility: visible;")
    }
}

export const initCalendarEditListeners = () => {
    dayColumns.addEventListener('click', onCalendarClick);
}