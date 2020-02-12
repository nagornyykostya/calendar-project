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
                const reminder = getRemindersObjByHourStart(remindersPerDay, i);
                if (reminder != undefined) {
                    const duration = getDuration(reminder.finishTime, reminder.startTime);
                    const startMinutes = getMinutesStart(reminder.startTime);
                    arrDayCells.push(`<div class="day-column__hour-cell"><div class="day-column__reminder-item" style="height:${duration}px;top:${startMinutes}px;" id="${reminder.id}">${reminder.title} ${reminder.startTime} - ${reminder.finishTime}</div></div>`);
                } else {
                    arrDayCells.push(`<div class="day-column__hour-cell" ></div>`);
                }
            } else {
                arrDayCells.push(`<div class="day-column__hour-cell" ></div>`);
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


// let firstDate = '11:43';
// let secondDate = '13:14';
			
// let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]); //получение даты из строки (подставляются часы и минуты
// let different = (getDate(secondDate) - getDate(firstDate));

// let hours = Math.floor((different % 86400000) / 3600000);
// let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
// let result = hours + ':' + minutes;

// console.log(result);

const getDuration = (finishTime, startTime) => {
    let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]);
    let different = (getDate(finishTime) - getDate(startTime));
    let hours = Math.floor((different % 86400000) / 3600000);
    let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
    return hours * 60 + minutes;
}

const getMinutesStart = (startTime) => {
   return startTime.split(':')[1];
}