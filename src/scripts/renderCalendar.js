import { initCalendar } from './inititalCalendarData.js';
import { remindersStorage } from './storage.js';
import { getRemindersArrFilterByWeek, getRemindersObjByHourStart } from './getReminders.js';

const miliSecondsPerDay = 86400000;
const dayColumns = document.querySelector(".day-columns");
const popUp = document.querySelector('.pop-up-form');
const deleteBtn = document.querySelector(".calendar-issues-form__delete-btn")
const title = document.getElementById("title");
const date = document.getElementById("date");
const startTime = document.getElementById("startTime");
const finishTime = document.getElementById("finishTime");
const description = document.getElementById("description");
const colorItemInput = document.getElementById("item-color");

const getRemindersPerCell = (remindersPerDay, i) => {

    const reminder = getRemindersObjByHourStart(remindersPerDay, i);
    const arrReminders = reminder.map(item => {

        const z = reminder.indexOf(item);
        const duration = getDuration(reminder[z].finishTime, reminder[z].startTime);
        const startMinutes = getMinutesStart(reminder[z].startTime);

        return `<div class="day-column__reminder-item"  style="min-height:${duration}px;
        top:${+startMinutes + 5 + (z * 5)}px;
        left:${z > 0 ? (z * 2) * 10 : z + 4}px;
        background-color:${reminder[z].itemColor}" 
        id="${reminder[z].id}"><span class="day-column__reminder-item-title"><span class="day-column__reminder-item-number">#${z + 1}</span> ${reminder[z].title}</span>
        <br><span><i class="large material-icons day-column__reminder-item-number">access_time</i> ${reminder[z].startTime} - ${reminder[z].finishTime}</span></div>`
    });
    return arrReminders.join('');
}

const createHourCellsElements = (remindersPerDay) => {
    const arrOfHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    const arrDayCellsElems = arrOfHours.map(i =>
        `<div class="day-column__hour-cell" id="${i < 10 ? "0" + i : i}:00">${getRemindersPerCell(remindersPerDay, i)}</div>`
    )
    return arrDayCellsElems.join('');
}

export const renderCalendar = () => {
    const arrOfWeekDays = [0, 1, 2, 3, 4, 5, 6]
    const arrOfCalendarColums = arrOfWeekDays.map(i => {
        const datesPerWeek = initCalendar.selectedWeek + (i * miliSecondsPerDay);
        const remindersPerDay = getRemindersArrFilterByWeek(datesPerWeek);
        return ` <div class="day-column" data-date="${datesPerWeek}">${createHourCellsElements(remindersPerDay)}</div>`
    })
    dayColumns.innerHTML = arrOfCalendarColums.join('');
    renderCurrentTimeLine();
}

const renderCurrentTimeLine = () => {
    const dayColumnsArray = [...dayColumns.children];
    const currentDate = dayColumnsArray.find(item => new Date(+item.dataset.date).getDate() === new Date().getDate()
        && new Date(+item.dataset.date).getMonth() === new Date().getMonth())
    if (currentDate != undefined) {
        const currentTimeLine = document.createElement('div');
        currentTimeLine.innerHTML = `<div class="day-column__current-time">${new Date().getHours()}:${new Date().getMinutes() < 10
            ? '0' + new Date().getMinutes()
            : new Date().getMinutes()}</div>`;
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
    if (event.target.className == "day-column__reminder-item") {
        deleteBtn.disabled = false;
        let getObjectById = remindersStorage.find(item => item.id == event.toElement.id);
        title.value = getObjectById.title;
        date.value = getObjectById.date;
        startTime.value = getObjectById.startTime;
        finishTime.value = getObjectById.finishTime;
        description.value = getObjectById.description;
        colorItemInput.value = getObjectById.itemColor;
        initCalendar.editMode = true;
        initCalendar.id = event.toElement.id;
        popUp.setAttribute("style", "visibility: visible;");

    } else if (event.target.className == "day-column__hour-cell") {
        startTime.value = event.target.id;
        finishTime.value = event.target.id.slice(0, 2) + `:15`;

        const dateOfCell = new Date(+event.target.parentElement.dataset.date);

        date.value = `${dateOfCell.getFullYear()}-${dateOfCell.getMonth() < 10 ?
            `0${dateOfCell.getMonth() + 1}` :
            `${dateOfCell.getMonth() + 1}`}-${dateOfCell.getDate() < 10 ?
                `0${dateOfCell.getDate()}` : `${dateOfCell.getDate()}`}`
        colorItemInput.value = initCalendar.itemColor;
        popUp.setAttribute("style", "visibility: visible;");
    }
}

export const initCalendarEditListeners = () => {
    dayColumns.addEventListener('click', onCalendarClick);

}