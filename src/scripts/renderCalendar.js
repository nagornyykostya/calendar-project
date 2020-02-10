export const renderCalendar = () => {
    const dayColumns = document.querySelector(".day-columns");

    let arrDayColumns = [];
    let arrDayCells = [];

    for (let i = 0; i < 24; i++) {
        arrDayCells.push(`<div class="day-column__hour-cell"></div>`);
    }
    const columnCellsElements = arrDayCells.join('');

    for (let i = 0; i < 7; i++) {
        arrDayColumns.push(` <div class="day-column">${columnCellsElements}</div>`)
    }
    dayColumns.innerHTML = arrDayColumns.join('');
}