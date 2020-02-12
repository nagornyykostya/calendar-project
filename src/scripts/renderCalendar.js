import { initCalendar } from './storage.js';
import { getRemindersArrFilterByWeek, getRemindersObjByHourStart } from './getReminders.js';

export const renderCalendar = () => {

    const dayColumns = document.querySelector(".day-columns");
    let arrDayColumns = [];

    for (let i = 0; i < 7; i++) {
        let datesPerWeek = initCalendar.selectedWeek + (i * initCalendar.miliSecondsPerDay);
        let arrDayCells = [];
        let remindersPerDay = getRemindersArrFilterByWeek(datesPerWeek);
        for (let i = 0; i < 24; i++) {
            if (remindersPerDay) {
                if (getRemindersObjByHourStart(remindersPerDay, i) != undefined) {
                    arrDayCells.push(`<div class="day-column__hour-cell" id="${getRemindersObjByHourStart(remindersPerDay, i).id}">${getRemindersObjByHourStart(remindersPerDay, i).title}</div>`);
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
}
