import { initCalendar } from './storage.js';
import { getRemindersArrFilterByWeek, getRemindersObjByHourStart } from './getReminders.js';

const dayColumns = document.querySelector(".day-columns");

export const renderCalendar = () => {

    let arrDayColumns = [];

    for (let i = 0; i < 7; i++) {
        let datesPerWeek = initCalendar.selectedWeek + (i * initCalendar.miliSecondsPerDay);
        let arrDayCells = [];
        let remindersPerDay = getRemindersArrFilterByWeek(datesPerWeek);
        for (let i = 0; i < 24; i++) {
            if (remindersPerDay) {
                if (getRemindersObjByHourStart(remindersPerDay, i) != undefined) {
                    arrDayCells.push(`<div class="day-column__hour-cell" id="${getRemindersObjByHourStart(remindersPerDay, i).id}"><div>${getRemindersObjByHourStart(remindersPerDay, i).title} ${getRemindersObjByHourStart(remindersPerDay, i).finishTime}</div></div>`);
                } else {
                    arrDayCells.push(`<div class="day-column__hour-cell" id="${i < 10 ? "0" + i : i}"></div>`);
                }
            } else {
                arrDayCells.push(`<div class="day-column__hour-cell" id="${i < 10 ? "0" + i : i}"></div>`);
            }
        }
        let columnCellsElements = arrDayCells.join('');

        arrDayColumns.push(` <div class="day-column" data-date="${datesPerWeek}">${columnCellsElements}</div>`)
    }
    dayColumns.innerHTML = arrDayColumns.join('');
    renderCurrentTimeLine();
}


const renderCurrentTimeLine = () => {
    console.log("line rendered")
    const dayColumnsArray = [...dayColumns.children];
    const currentDate = dayColumnsArray.find(item => new Date(+item.dataset.date).getDate() === new Date().getDate())
    const currentTimeLine = document.createElement('div');
    currentTimeLine.classList.add('day-column__current-time-line');
    currentDate.appendChild(currentTimeLine);
    const currentMinute = new Date().getHours() * 60 + new Date().getMinutes();
    currentTimeLine.style.top = `${currentMinute}px`
    
}


