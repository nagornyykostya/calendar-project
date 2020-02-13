import { initCalendar } from './storage.js';

export const renderHeaderText = () => {
    const headerSelectedPeriod = document.querySelector(".header__selected-period");
    const currentMonday = new Date(initCalendar.selectedWeek);
    let checkDay = initCalendar.selectedWeek;
    let period = `${initCalendar.monthes[currentMonday.getMonth()]} ${currentMonday.getFullYear()}`
    for (let i = 0; i < 6; i++) {
        checkDay += initCalendar.miliSecondsPerDay;
        if (new Date(checkDay).getMonth() != currentMonday.getMonth()) {
            if (new Date(checkDay).getFullYear() != currentMonday.getFullYear()) {
                period = `${initCalendar.monthes[currentMonday.getMonth()]} ${currentMonday.getFullYear()} - ${initCalendar.monthes[new Date(checkDay).getMonth()]} ${new Date(checkDay).getFullYear()}`;
            } else {
                period = `${initCalendar.monthes[currentMonday.getMonth()]} - ${initCalendar.monthes[new Date(checkDay).getMonth()]} ${currentMonday.getFullYear()}`;
            }
        }
    }
    headerSelectedPeriod.innerHTML = period;
}